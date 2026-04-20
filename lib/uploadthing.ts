import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const StudioUploadButton = generateUploadButton<OurFileRouter>();
export const StudioUploadDropzone = generateUploadDropzone<OurFileRouter>();
