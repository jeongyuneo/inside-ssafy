package com.inssa.backend.menu.domain;

import com.inssa.backend.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "menu_id"))
@Entity
public class Menu extends BaseEntity {

    @NotNull
    @Column(name = "menu_date")
    private LocalDate date;

    @NotNull
    private String dayOfTheWeek;

    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private String subItem;
}
