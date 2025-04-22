"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { addGuest } from "@/action/guest";

const categories = ["Online", "Fisik"];

const guest_relations = [
  { id: "1", name: "Aura" },
  { id: "2", name: "Keanu" },
  { id: "3", name: "Mama Nildasari" },
  { id: "4", name: "Ibu Nia" },
  { id: "5", name: "Bunda Winindya" },
  { id: "6", name: "Ayah Budi" },
];

const formSchema = z.object({
  name: z.string().min(1).min(3),
  kategori: z.string(),
  relation_id: z.string(),
  vip: z.string(),
});

export default function AddGuestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // toast.promise()
      await addGuest({
        name: values.name,
        relationId: parseInt(values.relation_id),
        vip: values.vip === "true",
        category: values.kategori,
      });

      // toast.success(JSON.stringify(values, null, 2));
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mr-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Guest Name" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kategori"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invitation Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Guest Invitation Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
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
          name="relation_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest Relation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Guest Relation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  {guest_relations.map((relation, index) => (
                    <SelectItem key={index} value={relation.id}>
                      {relation.name}
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
          name="vip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guest Role</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Guest Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <SelectItem value={"true"}>VIP GUEST</SelectItem>
                  <SelectItem value={"false"}>NON-VIP GUEST</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Guest
        </Button>
      </form>
    </Form>
  );
}
