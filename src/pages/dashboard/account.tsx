import { useAppDispatch } from "@/app/hooks";
import AccountForm from "@/components/dashboard/account/account-form";
import AccountSkeleton from "@/components/dashboard/account/account-skeleton";
import { DataErrorState } from "@/components/ui/data-error-state";
import { logout } from "@/features/auth/auth-slice";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "@/features/api/profile-api";
import ErrorHandler from "@/lib/error-handler";
import { formatBytes } from "@/lib/utils";
import {
  updateProfileImgSchema,
  updateProfileSchema,
  type TUpdateProfileImgRequest,
  type TUpdateProfileRequest,
} from "@/validation/profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { apiSlice } from "@/features/api/api-slice";

const Account = () => {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading: loadingProfile,
    isError: errorProfile,
    refetch,
  } = useGetProfileQuery();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const formProfileImg = useForm<TUpdateProfileImgRequest>({
    resolver: zodResolver(updateProfileImgSchema),
    values: {
      profile_image: profile?.profile_image ?? "",
    },
  });

  const formProfile = useForm<TUpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? "",
    },
  });

  const imagePreview = useWatch({
    control: formProfileImg.control,
    name: "profile_image",
  });

  if (loadingProfile) {
    return <AccountSkeleton />;
  }

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1️⃣ Validasi Format (Hanya JPEG & PNG)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Format file tidak didukung. Hanya boleh JPG, JPEG, atau PNG",
      );
      // Reset input agar file yang salah tidak tersangkut
      if (e.target) e.target.value = "";
      return;
    }

    // 2️⃣ Validasi size (100 KB)
    if (file.size > 100 * 1024) {
      toast.error(
        `File terlalu besar: ${formatBytes(file.size)}, maksimal 100KB`,
      );
      if (e.target) e.target.value = "";
      return;
    }

    // 3️⃣ Preview instan (local only)
    const previewUrl = URL.createObjectURL(file);
    formProfileImg.setValue("profile_image", previewUrl, { shouldDirty: true });

    // 4️⃣ Kirim ke API
    const formData = new FormData();
    formData.append("file", file);

    updateProfileImage(formData)
      .unwrap()
      .then(() => {
        toast.success("Foto profil berhasil diperbarui");
      })
      .catch((error) => {
        toast.error(ErrorHandler.handleDefault(error).message);
        // rollback ke foto lama jika gagal upload
        formProfileImg.setValue("profile_image", profile?.profile_image);
      })
      .finally(() => {
        // Bersihkan memori URL object
        URL.revokeObjectURL(previewUrl);
      });
  }

  async function onSubmit(values: TUpdateProfileRequest) {
    startTransition(async () => {
      try {
        const message = await updateProfile(values).unwrap();
        setIsEditProfile(false);
        toast.success(message ?? "Profil berhasil diperbarui");
      } catch (error) {
        toast.error(
          ErrorHandler.handleDefault(error).message ??
            "Gagal memperbarui profil",
        );
      }
    });
  }

  if (errorProfile) return <DataErrorState onRetry={refetch} />;

  return (
    <div className="container max-w-5xl">
      <AccountForm
        profile={profile}
        isEditProfile={isEditProfile}
        setIsEditProfile={setIsEditProfile}
        isPending={isPending}
        imagePreview={imagePreview}
        formProfile={formProfile}
        formProfileImg={formProfileImg}
        fileInputRef={fileInputRef}
        handleEditClick={handleEditClick}
        handleImageChange={handleImageChange}
        onSubmit={onSubmit}
        onLogout={() => {
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
          navigate("/auth/login", { replace: true });
        }}
      />
    </div>
  );
};

export default Account;
