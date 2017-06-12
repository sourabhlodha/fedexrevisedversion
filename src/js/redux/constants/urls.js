const API = 'https://reqres.in/api';

export const LOGIN = `${API}/login`;
export const LOGIN_WITH_TOKEN = `${API}/token`;
export const CREATE = `${API}/users`;

const IMAGELIST_CONNECTION = '../../../resources/data/ImageList.json';

export const IMAGELIST=IMAGELIST_CONNECTION;
export const VISIONAPI='https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags&subscription-key=74418291cf1c46ceb5bd0133f78e9112';

export const OCRVISIONAPI='https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation=true&Subscription-Key=8777479ad7414c46bbe3e78d7e399b41';
export const HANDWRITTENVISIONAPI='https://westus.api.cognitive.microsoft.com/vision/v1.0/recognizeText?handwriting=true&Subscription-Key=8777479ad7414c46bbe3e78d7e399b41';
