//^ hook used to edit cart

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCart } from "../../services/apiCarts";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient() //* needed to invalidate the query after adding a new cart(so data is refetched)


const {mutate: updateSetting, isPending: isUpdating} = useMutation({ //* whenever we change something(add, delete, update) we use useMutation(react-query hook)
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfully updated')
      queryClient.invalidateQueries({ queryKey:['settings']}) //* invalidates the query so data is refetched
    },
    onError: (error) => {
      toast.error(error.message)
    },
    });

return {isUpdating, updateSetting}
}