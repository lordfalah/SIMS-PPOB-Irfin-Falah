import { Controller } from "react-hook-form";
import { PencilIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { AccountFormProps } from "@/types/account-form.type";
import { UserAvatar } from "@/components/user-avatar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Fragment } from "react/jsx-runtime";

const AccountForm = ({
  profile,
  isEditProfile,
  setIsEditProfile,
  isPending,
  imagePreview,
  formProfile,
  formProfileImg,
  fileInputRef,
  handleEditClick,
  handleImageChange,
  onSubmit,
  onLogout,
}: AccountFormProps) => {
  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`.trim()
    : "User";

  return (
    <form
      id="form-profile"
      onSubmit={formProfile.handleSubmit(onSubmit)}
      className="grid gap-4"
    >
      {/* --- SEKSI AVATAR --- */}
      <div className="relative mx-auto size-24">
        <UserAvatar
          name={fullName}
          image={imagePreview}
          className="border-muted-foreground/30 size-24 border"
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute -right-2 bottom-2 size-8 cursor-pointer rounded-full border bg-white"
          onClick={handleEditClick}
        >
          <PencilIcon className="size-4 text-gray-600" />
        </Button>
      </div>

      {/* --- INPUT FILE TERSEMBUNYI --- */}
      <Controller
        name="profile_image"
        control={formProfileImg.control}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { value, ...fieldProps }, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="flex justify-center text-xl">
              {fullName || "Foto Profile"}
            </FieldLabel>
            <Input
              {...fieldProps}
              type="file"
              accept="image/*"
              className="hidden"
              ref={(e) => {
                fieldProps.ref(e);
                fileInputRef.current = e;
              }}
              onChange={handleImageChange}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* --- EMAIL (READ ONLY) --- */}
      <div className="mb-3.5 space-y-3.5">
        <Label htmlFor="email">Email</Label>
        <InputGroup>
          <InputGroupInput
            disabled
            id="email"
            defaultValue={profile?.email ?? ""}
            type="email"
          />
          <InputGroupAddon>@</InputGroupAddon>
        </InputGroup>
      </div>

      {/* --- NAMA DEPAN & BELAKANG --- */}
      <FieldGroup>
        <Controller
          name="first_name"
          control={formProfile.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nama Depan</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  disabled={!isEditProfile}
                  placeholder="Nama depan"
                />
                <InputGroupAddon>
                  <User size={15} />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="last_name"
          control={formProfile.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nama Belakang</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  disabled={!isEditProfile}
                  placeholder="Nama belakang"
                />
                <InputGroupAddon>
                  <User size={15} />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* --- TOMBOL AKSI --- */}
      <Field className="mt-4 flex flex-col gap-3">
        {isEditProfile ? (
          <Fragment>
            <Button
              className="cursor-pointer bg-red-500 py-6 hover:bg-red-800"
              disabled={isPending}
              type="submit"
              form="form-profile"
            >
              {isPending ? <Spinner /> : "Simpan"}
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer border-red-500 py-6 text-red-500"
              type="button"
              onClick={() => {
                setIsEditProfile(false);
                formProfile.reset();
              }}
            >
              Batalkan
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              variant="outline"
              className="cursor-pointer border-red-500 py-6 text-red-500"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditProfile(true);
              }}
            >
              Edit Profile
            </Button>
            <Button
              className="cursor-pointer bg-red-500 py-6 hover:bg-red-800"
              type="button"
              onClick={onLogout}
            >
              Logout
            </Button>
          </Fragment>
        )}
      </Field>
    </form>
  );
};

export default AccountForm;
