import axios from 'axios';
import { requestOcrType, responseOcr } from './types';

const requestAPI = async ({
  version,
  requestId,
  timestamp,
  images,
}: requestOcrType) => {
  try {
    const { status, data }: { status: number; data: responseOcr } = await axios(
      {
        headers: {
          'X-OCR-SECRET': 'TmlMblpnZ3ZJQmdPTElJaEJDcEdvZGR2eUt3cWJYa00=',
        },
        method: 'POST',
        url: 'https://am9tugm3i7.apigw.ntruss.com/custom/v1/19054/4b04fcc4134ed08520872cc1993d11e97cde586a01ff84a2928fe6b1a9caaf1a/general',
        data: {
          version,
          requestId,
          timestamp,
          images,
          lang: 'ko',
          enableTableDetection: true,
        },
      },
    );
    console.log('status : ' + status);
    if (status === 200) {
      console.log('ocr 성공');
      console.log(data);
      return data;
    }
    return -1;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

export default requestAPI;
