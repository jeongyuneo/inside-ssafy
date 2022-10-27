package com.inssa.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberUpdateRequest {

    private String password;
    private String newPassword;
}
