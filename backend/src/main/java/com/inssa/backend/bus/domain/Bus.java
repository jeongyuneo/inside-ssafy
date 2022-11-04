package com.inssa.backend.bus.domain;

import com.inssa.backend.common.domain.BaseEntity;
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
    @JoinColumn(name = "last_visited_bus_stop_id")
    private BusStop lastVisitedBusStop;

    @Builder.Default
    @OneToMany(mappedBy = "bus", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Route> routes = new ArrayList<>();

    public void arriveAt(BusStop busStop) {
        lastVisitedBusStop = busStop;
    }
}
