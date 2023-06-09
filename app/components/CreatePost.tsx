import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CalendarDatePicker } from "./DatePicker";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { addYears, addMonths } from "date-fns";
import { storage } from "../firebase-config";
import { ref as storageRef, uploadBytes } from "firebase/storage";

const postSchema = yup.object().shape({
  product: yup.string().required("Required"),
  store: yup.string().required("Required"),
  period: yup.number().integer().positive().required("Required"),
});

type FormValues = {
  product: string;
  store: string;
  period: number;
  date: any;
  type: string;
  expiryDate: any;
  picture: string;
};

const postInitial: FormValues = {
  product: "",
  store: "",
  period: 0,
  date: "",
  type: "",
  expiryDate: "",
  picture: "",
};

type CreatePostProps = {
  buttonRef: React.RefObject<HTMLButtonElement>;
};

const CreatePost: FC<CreatePostProps> = React.forwardRef(
  ({ buttonRef }, ref) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(
      async (values: FormValues) =>
        await axios.post("/api/posts/addPost", { values }),
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
            description: "You have successfully uploaded your content",
          });
          queryClient.invalidateQueries(["posts"]);
        },
      }
    );

    const uploadFile = async () => {
      const filesFolderRef = storageRef(
        storage,
        `clientReceipts/${fileUpload?.name}`
      );
      try {
        if (fileUpload) {
          await uploadBytes(filesFolderRef, fileUpload);
        }
      } catch (err) {
        console.log(err);
      }
    };

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
      values.type = type;
      values.picture = fileUpload.name;
      if (values.type === "years")
        values.expiryDate = addYears(values.date, values.period);
      if (values.type === "months")
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

    const [Dates, setDates] = useState<string | undefined>(undefined);
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
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={buttonRef} className="hidden" variant="outline">
            Edit Profile
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription>Click save when you are done.</DialogDescription>
          </DialogHeader>
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
          <DialogFooter>
            <form onSubmit={formik.handleSubmit}>
              <Button type="submit" isLoading={isLoading}>
                Save changes
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

CreatePost.displayName = "CreatePost";

export default CreatePost;
