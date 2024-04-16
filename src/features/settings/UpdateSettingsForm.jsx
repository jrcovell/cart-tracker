import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {isPending, settings: {
    minBookingTime,
    maxBookingTime,
    maxGolfersPerBooking,
  } = {}, //* need to set empty object to avoid error when settings is undefined(initially), values are fetched when the component mounts
  } = useSettings();

  const {isUpdating, updateSetting} = useUpdateSetting();

  if (isPending) return <Spinner/>

function handleUpdate(e, key) {
  const setting = e.target.value
  // console.log(setting) // * minBookingTime: "09:00"
  if(!setting) return
  updateSetting({[key]: setting})
}


  return (
    <Form>
      <FormRow label='Minimum booking time'>
        <Input type='time' id='min-time' defaultValue={minBookingTime} disabled={isUpdating} onBlur={e=>handleUpdate(e, 'minBookingTime')}/>
      </FormRow>
      <FormRow label='Maximum booking time'>
        <Input type='time' id='max-time' defaultValue={maxBookingTime} disabled={isUpdating} onBlur={e=>handleUpdate(e, 'maxBookingTime')} />
      </FormRow>
      <FormRow label='Maximum golfers'>
        <Input type='number' id='max-golfers' defaultValue={maxGolfersPerBooking} disabled={isUpdating} onBlur={e=>handleUpdate(e, 'maxGolfersPerBooking')} />
      </FormRow>
      
    </Form>
  );
}

export default UpdateSettingsForm;
