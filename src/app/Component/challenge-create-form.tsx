"use client";

import { useForm } from "react-hook-form";
import Input from "@/app/Component/ui/input";
import Checkbox from "@/app/Component/ui/checkbox";
import Button from "@/app/Component/ui/button";
import FormField from "@/app/Component/shared/form-field";
import H1Title from "@/app/Component/ui/h1-title";
import { ChallengeCreateFormProps, ChallengeForm } from "@/types";

export default function ChallengeCreateForm({
  isAdmin = false,
  onSubmit,
}: ChallengeCreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeForm>({
    defaultValues: {
      name: "",
      description: "",
      ownerOnly: false,
      startDate: "2024-06-10",
      endDate: "2024-06-10",
    },
  });

  const handleFormSubmit = (data: ChallengeForm) => {
    const finalData = { ...data, isOfficial: isAdmin };
    if (onSubmit) {
      onSubmit(finalData);
    } else {
      console.log("챌린지 생성:", finalData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-[500px] mx-auto mt-10 px-4 flex flex-col gap-4"
    >
      <H1Title>{isAdmin ? "공식 챌린지 생성" : "챌린지 만들기"}</H1Title>

      <FormField label="챌린지 이름">
        <Input placeholder="카공해요" {...register("name")} />
      </FormField>

      <FormField label="챌린지 설명">
        <Input placeholder="매일매일이짜구" {...register("description")} />
      </FormField>

      <FormField label="챌린지 인증">
        <Checkbox label="방장만 인증 가능" {...register("ownerOnly")} />
      </FormField>

      <FormField label="챌린지 기간">
        <div className="flex items-center gap-2">
          <Input type="date" {...register("startDate")} className="w-40" />
          <span className="text-sm">~</span>
          <Input type="date" {...register("endDate")} className="w-40" />
        </div>
      </FormField>

      <Button type="submit">저장</Button>
    </form>
  );
}
