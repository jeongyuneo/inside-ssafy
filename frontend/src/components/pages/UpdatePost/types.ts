export interface PostDetailType {
  title: string;
  content: string;
  files: FileTypes[];
}

interface FileTypes {
  url: string;
}
