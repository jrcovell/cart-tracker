import { da } from "date-fns/locale";
import { NUMBER_OF_ITEMS } from "../utils/globals";
import {
  getDateNoTime,
  getToday,
  getTodayNoTime,
  getYesterday,
} from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sort, page }) {
  let query = supabase
    .from("bookings")
    .select("id, status, startDate2, carts(id), golfers(fullName)", {
      count: "exact",
    });
  //* count: 'exact' returns the number of results, without any other data. Useful for pagination. (can also use bookings.length to get the count which seems easier here)

  //* add conditions to query (filter)
  if (filter) {
    // undefined is falsy, so if filter is undefined, this block will not run
    query = query.eq(filter.field, filter.value);
  }
  //& dynamic filter ex. (from apiBookings.js) query = query[filter.method || 'eq'](filter.field, filter.value). if no method is provided, use 'eq' as default(our default way of filtering (equal to))

  //* add sorting to query (sort)
  if (sort) {
    // undefined by default, same as filter
    query = query.order(sort.field, {
      ascending: sort.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * NUMBER_OF_ITEMS; // 1 * 10 = 10, 2 * 10 = 20
    const to = from + NUMBER_OF_ITEMS - 1; // 10 + 10 - 1 = 19, 20 + 10 - 1 = 29
    query = query.range(from, to); // range is method from supabase to get a range of results
  }

  const { data, error, count } = await query;
  //* modified to include filter and sort above
  // const {data, error} = await supabase.from('bookings').select('id, carts(id), golfers(fullName)')// access to carts and golfers(without, would only get the ids) can specify only certain columns(fullName) to save data.
  // //* api sort example (.eq('status', 'playing') would only get bookings with status playing)

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, carts(*), golfers(*)")
    .eq("id", id) // get booking by id object
    .single(); // grab array of booking object

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj) //
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function createBooking(newBooking) {
  // console.log(newBooking);

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

//* booking id being passed in as a default value, so no need to pass it in when calling the function
export async function editBooking(updatedBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedBooking)
    .eq("id", updatedBooking.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

//date variable needs to be an ISO string(what supabase expects)
//getToday() returns an ISO string of the current date
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at")
    .gte("created_at", date)
    // end: true sets the date to the end of the day(in helpers.js) using optional chaining. makes sure the date does not change once set.
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getRoundsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, golfers(fullName)")
    .gte("startDate2", date)
    .lte("startDate2", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getRoundsSelectedDate() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, golfers(fullName)")
    .gte("startDate2", getToday())
    .lte("startDate2", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// get previous rounds depending on the filter (7 days, 30 days, 90 days)
export async function getRoundsSelectedDate2(date) {
  console.log(date);
  const { data, error } = await supabase
    .from("bookings")
    .select("*, golfers(fullName)")
    .gte("startDate2", date)
    .lte("startDate2", getDateNoTime());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

//! add startDate2 ? no time to implement should be easier than startDate
export async function getRoundsTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, golfers(fullName)")
    .or(
      `and(status.eq.playing,startDate.eq.${getToday()})`,
      `and(status.eq.checked-in,startDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

/*
export async function getRoundsSelectedDate(currentDate) {
  let query = supabase.from("bookings").select("*, golfers(fullName)");

  if (currentDate === 0) {
    query = query
      .gte("startDate", getYesterday())
      .lte("startDate", getYesterday({ end: true }));
  } else if (currentDate === 1) {
    query = query
      .gte("startDate", getToday())
      .lte("startDate", getToday({ end: true }));
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
*/

/*
  const { data, error } = await supabase
    .from("bookings")
    .select("*, golfers(fullName)")


    if (currentDate === 0) {
    .gte("startDate", getYesterday())
    .lte("startDate", getYesterday({ end: true }));
    } else if (currentDate === 1) {
    .gte("startDate", getToday())
    .lte("startDate", getToday({ end: true }));
    }
*/

/*
  if (currentDate === 0) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, golfers(fullName)")
      .gte("startDate", getYesterday())
      .lte("startDate", getYesterday({ end: true }));

    if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
    }

    return data;
  }
}
*/

/*
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}



export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
*/
