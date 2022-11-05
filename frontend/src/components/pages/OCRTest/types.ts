export interface requestOcrType {
  version: string; // v2로 고정
  requestId: string;
  timestamp: number;
  images: ocrImages[];
  lang?: string;
  enableTableDetection?: boolean;
}

export interface ocrImages {
  format: string;
  name: string;
  url?: string;
  data?: string;
  templateIds?: object[];
}

export interface responseOcr {
  uid: string;
  name: string;
  inferResult: string;
  message: string;
  matchedTemplate: templateItem;
  title: object;
  fields: imageFieldObject[];
  validationResult: validationItem;
  convertedImageInfo?: convertedImageObject[];
  combineResult?: combineResultObject;
  tables?: imageTableObject[];
}

export interface templateItem {
  id: number;
  name: string;
}

export interface validationItem {
  result: string;
  message: string;
}

export interface imageFieldObject {
  name: string;
  valueType: string;
  inferText: string;
  inferConfidence: number;
  boundingPoly: boundingPolicyObject;
  type: string;
  subFields: subFieldObject[];
  checked: boolean;
  lineBreak: boolean;
}

export interface boundingPolicyObject {
  vertices: verticesObject[];
}

export interface verticesObject {
  x: number;
  y: number;
}

export interface subFieldObject {
  boundingPoly: boundingPolicyObject;
  inferText: string;
  inferConfidence: number;
  lineBreak: boolean;
}

export interface convertedImageObject {
  width: number;
  height: number;
  pageIndex: number;
}

export interface combineResultObject {
  name: string;
  text: string;
}

export interface imageTableObject {
  cells: tableCellObject[];
  boundingPoly: boundingPolicyObject;
  inferConfidence: number;
}

export interface tableCellObject {
  cellTextLines: object[];
  boundingPoly: boundingPolicyObject;
  inferConfidence: number;
  rowSpan: number;
  rowIndex: number;
  columnSpan: number;
  columnIndex: number;
}
