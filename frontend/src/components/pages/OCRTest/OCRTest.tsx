import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Button from '../../atoms/Button';
import requestAPI from './requestOCRData';

const OCRTest = () => {
  const webcamRef = useRef(null);
  // 공유 주소 : https://ifh.cc/g/9qfMKz
  // 이미지 주소 : https://ifh.cc/g/9qfMKz.jpg
  //<a href='https://ifh.cc/v-9qfMKz' target='_blank'><img src='https://ifh.cc/g/9qfMKz.jpg' border='0'></a>
  //[URL=https://ifh.cc/v-9qfMKz][IMG]https://ifh.cc/g/9qfMKz.jpg[/IMG][/URL]
  const [imgSrc, setImgSrc] = React.useState('https://ifh.cc/g/9qfMKz.jpg');
  const [request, setRequest] = useState({
    version: 'v2',
    requestId: 'string',
    timestamp: 0,
    images: [
      {
        format: 'jpg',
        name: 'ocrtest',
        url: imgSrc,
      },
    ],
  });

  const sendOCR = () => {
    console.log('click');
    const response = requestAPI(request);
  };

  return (
    <>
      <Webcam audio={false} screenshotFormat="image/jpeg" ref={webcamRef} />;
      <Button clickHandler={sendOCR}>사진찍기</Button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
};

export default OCRTest;
