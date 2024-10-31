import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = <T extends z.ZodType<any>>(
    schema: T,
    defaultValues?: DefaultValues<z.TypeOf<T>> | undefined
) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm<z.TypeOf<T>>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    return {
        register,
        errors,
        handleSubmit,
        watch,
        reset,
    }
}