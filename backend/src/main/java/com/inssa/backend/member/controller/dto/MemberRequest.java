package com.inssa.backend.member.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRequest {

    private String email;
    private String password;
    private String name;
    private String studentNumber;
}
