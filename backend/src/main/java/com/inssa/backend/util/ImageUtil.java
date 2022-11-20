package com.inssa.backend.util;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.BadRequestException;
import com.inssa.backend.common.exception.FileSaveException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import static com.inssa.backend.common.domain.ErrorMessage.FAIL_TO_SAVE_FILE;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageUtil {

    private static final String IMAGE_ROOT_PATH = "/home";
    private static final String POINT = ".";
    private static final String SEPARATOR = "/";
    private static final String IMAGE_JPG = "image/jpg";
    private static final String IMAGE_JPEG = "image/jpeg";
    private static final String IMAGE_PNG = "image/png";
    private static final String IMAGE_GIF = "image/gif";
    private static final String IMAGE_REQUEST = "/images";
    private static final String POST = "post";

    public static String saveImage(MultipartFile multipartFile) {
        validateContentType(multipartFile.getContentType());
        StringBuilder imageUploadPath = new StringBuilder(new File(IMAGE_ROOT_PATH).getAbsolutePath());
        imageUploadPath.append(File.separator).append(POST);
        File imageFile = new File(imageUploadPath.toString());
        if (!imageFile.exists()) {
            imageFile.mkdir();
        }
        String imageFileName = UUID.randomUUID() + POINT + extractExt(multipartFile.getContentType());
        imageUploadPath.append(File.separator).append(imageFileName);
        try {
            multipartFile.transferTo(new File(imageUploadPath.toString()));
        } catch (IOException e) {
            throw new FileSaveException(FAIL_TO_SAVE_FILE);
        }
        return IMAGE_REQUEST + File.separator + POST + File.separator + imageFileName;
    }

    private static void validateContentType(String contentType) {
        if (isWrongContentType(contentType)) {
            throw new BadRequestException(ErrorMessage.WRONG_CONTENT_TYPE);
        }
    }

    private static boolean isWrongContentType(String contentType) {
        return !(contentType.contains(IMAGE_JPG) || contentType.contains(IMAGE_JPEG) || contentType.contains(IMAGE_PNG) || contentType.contains(IMAGE_GIF));
    }

    private static String extractExt(String contentType) {
        return contentType.substring(contentType.lastIndexOf(SEPARATOR) + 1);
    }
}
