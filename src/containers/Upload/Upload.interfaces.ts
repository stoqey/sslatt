export interface IFile extends File {
  filename?: string;
  preview?: string;
  url?: string; // uploaded url
  uploaded?: boolean;
}

export interface IFileSpec {
  filename: string;
  preview: string;
  url?: string; // uploaded url
  uploaded: boolean;
}
