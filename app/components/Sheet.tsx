import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Edit } from "lucide-react";
import { CalendarDatePicker } from "./DatePicker";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { addYears, addMonths } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "../firebase-config";
import { ref as storageRef, uploadBytes, deleteObject } from "firebase/storage";

type FormValues = {
  id?: string;
  product: string | undefined;
  store: string | undefined;
  period: number;
  date: any;
  Type: string | undefined;
  expiryDate: any;
  picture: string;
};

export function SheetDemo({
  id,
  product,
  store,
  period,
  date,
  Type,
  expiryDate,
  picture,
}: FormValues) {
  const postSchema = yup.object().shape({
    product: yup.string().required("Required"),
    store: yup.string().required("Required"),
    period: yup.number().required("Required"),
  });

  const postInitial: FormValues = {
    product: product,
    store: store,
    period: period,
    date: date,
    Type: Type,
    expiryDate: expiryDate,
    picture: "",
  };

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation(
    async (values: FormValues) =>
      await axios.post("/api/posts/editPost", { values }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
        setIsLoading(false);
      },
      onSuccess: (data) => {
        setIsLoading(false);
        toast({
          title: "Success !",
          description: "You have successfully updated",
        });
        queryClient.invalidateQueries(["posts"]);
        router.push("/dashboard");
      },
    }
  );

  const onSubmit = (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    setIsLoading(true);
    if (Dates === undefined) {
      setDateError("Please select date of purchase");
      setIsLoading(false);
      return;
    }
    if (fileUpload === null) {
      setFileError("Please upload your Receipt");
      setIsLoading(false);
      return;
    }
    values.date = Dates;
    values.Type = type;
    values.id = id;
    values.picture = fileUpload.name;
    if (values.Type === "years")
      values.expiryDate = addYears(values.date, values.period);
    if (values.Type === "months")
      values.expiryDate = addMonths(values.date, values.period);
    uploadFile();
    onSubmitProps.resetForm();
    mutate(values);
  };

  const formik = useFormik({
    initialValues: postInitial,
    validationSchema: postSchema,
    onSubmit,
  });

  const uploadFile = async () => {
    const filesFolderRef = storageRef(
      storage,
      `clientReceipts/${fileUpload?.name}`
    );
    try {
      const prevImageRef = storageRef(storage, `clientReceipts/${picture}`);
      await deleteObject(prevImageRef);

      if (fileUpload) {
        await uploadBytes(filesFolderRef, fileUpload);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [Dates, setDates] = useState<string | undefined>(date);
  const [type, setType] = useState<string>("years");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const { toast } = useToast();

  const DatePicker = (date: string | undefined) => {
    setDates(date);
    if (date) {
      setDateError("");
    }
  };

  return (
    <Sheet>
      <form onSubmit={formik.handleSubmit}>
        <SheetTrigger asChild>
          <Button variant="secondary" className="w-full">
            <Edit className="mr-2 h-4 w-4" /> Edit Details
          </Button>
        </SheetTrigger>
        <SheetContent position="right" size="sm">
          <SheetHeader>
            <SheetTitle>Edit Item</SheetTitle>
            <SheetDescription>
              Make changes to your item here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                Product
              </Label>
              <Input
                id="product"
                value={formik.values.product}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="col-span-3"
              />
              {formik.errors.product && formik.touched.product && (
                <p className="text-[#fc8181] text-[0.75rem] col-span-4 text-right">
                  {formik.errors.product}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="store" className="text-right">
                Store
              </Label>
              <Input
                id="store"
                value={formik.values.store}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="col-span-3"
              />
              {formik.errors.store && formik.touched.store && (
                <p className="text-[#fc8181] text-[0.75rem] col-span-4 text-right">
                  {formik.errors.store}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Period
              </Label>
              <Input
                id="period"
                value={formik.values.period}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="col-span-3"
              />
              <RadioGroup
                defaultValue="years"
                className="col-span-4 flex flex-row gap-4 justify-center"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="years"
                    id="type"
                    onClick={() => setType("years")}
                  />
                  <Label htmlFor="r1">Years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="months"
                    id="type"
                    onClick={() => setType("months")}
                  />
                  <Label htmlFor="r2">Months</Label>
                </div>
              </RadioGroup>
              {formik.errors.period && formik.touched.period && (
                <p className="text-[#fc8181] text-[0.75rem] col-span-4 text-right">
                  {formik.errors.period}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                When did you buy?
              </Label>
              <CalendarDatePicker DatePicker={DatePicker} />

              <p className="text-[#fc8181] text-[0.75rem] col-span-4 text-right">
                {dateError}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right">
                Receipt
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setFileUpload(files[0]);
                  }
                }}
                className="col-span-3"
              />

              <p className="text-[#fc8181] text-[0.75rem] col-span-4 text-right">
                {fileError}
              </p>
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" isLoading={isLoading}>
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  );
}
