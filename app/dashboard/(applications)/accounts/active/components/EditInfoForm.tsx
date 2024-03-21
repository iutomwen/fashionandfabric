"use client";
import {
  AccountTableProps,
  CityTableProps,
  CountryTableProps,
  StateTableProps,
} from "@/utils/types";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import validator from "validator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { updateAccountById } from "../../actions";
const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Invalid email address.",
    })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .refine(validator.isMobilePhone, {
      message: "Invalid phone number.",
    })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(2, {
      message: "Address must be at least 2 characters.",
    })
    .optional()
    .or(z.literal("")),
  city: z
    .string({
      required_error: "City is required.",
    })
    .optional()
    .or(z.literal("")),
  state: z
    .string({
      required_error: "State is required.",
    })
    .optional()
    .or(z.literal("")),
  country: z
    .string({
      required_error: "Country is required.",
    })
    .optional()
    .or(z.literal("")),
});
export default function EditInfoForm({
  profile,
  countries,
  states,
  cities,
  triggerId,
}: {
  profile: AccountTableProps;
  countries: CountryTableProps[];
  states: StateTableProps[];
  cities: CityTableProps[];
  triggerId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [countryData, setCountryData] = React.useState<CountryTableProps[]>([]);
  const [stateData, setStateData] = React.useState<StateTableProps[]>([]);
  const [cityData, setCityData] = React.useState<CityTableProps[]>([]);

  React.useEffect(() => {
    setCountryData(countries);
  }, [countries]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
      email: profile?.username || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      city: profile?.city?.id.toString() || "",
      state: profile?.state?.id.toString() || "",
      country: profile?.country?.id.toString() || "",
    },
    mode: "onBlur",
  });
  React.useEffect(() => {
    if (form.getValues("country")) {
      setStateData(
        states.filter(
          (state) =>
            state.country.id === parseInt(form.getValues("country") ?? "")
        )
      );
    }
  }, [form.getValues("country")]);
  React.useEffect(() => {
    if (form.getValues("state")) {
      setCityData(
        cities.filter(
          (city) => city.state.id === parseInt(form.getValues("state") ?? "")
        )
      );
    }
  }, [form.getValues("state")]);
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { firstName, lastName, email, phone, address, city, state, country } =
      values;
    const updateData = {
      first_name: firstName,
      last_name: lastName,
      username: email,
      phone,
      address,
      city_id: parseInt(city as string),
      state_id: parseInt(state as string),
      country_id: parseInt(country as string),
      id: profile.id,
    };
    startTransition(async () => {
      const result = await updateAccountById(profile.id, updateData);
      const { error, data: updatedData } = JSON.parse(result);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Account Updated",
        description: `${updateData.first_name} account has been updated.`,
      });
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
      document.getElementById(triggerId)?.click();
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    type="text"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    type="text"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone number"
                    type="text"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" overflow-scroll">
                    {countryData.map((country) => (
                      <SelectItem
                        key={country.id}
                        value={country.id.toString()}
                      >
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stateData.map((state) => {
                      return (
                        <SelectItem value={state.id.toString()} key={state.id}>
                          {state.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" overflow-scroll">
                    {cityData.map((city) => (
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Home Address"
                    type="text"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full flex gap-2 items-center bg-black text-white dark:bg-white dark:text-black"
          variant="outline"
        >
          Update Info
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
