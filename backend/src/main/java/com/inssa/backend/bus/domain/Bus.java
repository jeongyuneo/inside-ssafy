package com.inssa.backend.bus.domain;

import com.inssa.backend.common.domain.BaseEntity;
import com.inssa.backend.common.domain.Image;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "bus_id"))
@Entity
public class Bus extends BaseEntity {

    @NotNull
    private int number;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_visited_route_id")
    private Route lastVisited;

    @Builder.Default
    @OneToMany(mappedBy = "bus", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Route> routes = new ArrayList<>();

    public void arriveAt(Route route) {
        lastVisited = route;
    }
}
