import type { TProfile } from "@/features/api/profile-api";
import type {
  TUpdateProfileImgRequest,
  TUpdateProfileRequest,
} from "@/validation/profile.validation";
import type { UseFormReturn } from "react-hook-form";

export interface AccountFormProps {
  profile: TProfile | undefined;
  isEditProfile: boolean;
  setIsEditProfile: (value: boolean) => void;
  isPending: boolean;
  imagePreview: string | null | undefined;
  formProfile: UseFormReturn<TUpdateProfileRequest>;
  formProfileImg: UseFormReturn<TUpdateProfileImgRequest>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleEditClick: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (values: TUpdateProfileRequest) => void;
  onLogout: () => void;
}
