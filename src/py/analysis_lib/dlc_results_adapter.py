"""
    This class removes the need to use pandas to access the h5
    DeepLabCut data. This is easier to work with and is ~20x faster
    for repeated access
"""
from __future__ import annotations
import pandas as pd
import numpy as np
from dataclasses import dataclass
from typing import List


class DlcResults:
    def __init__(self, labels: List[DlcResultLabel], data: np.ndarray):
        self.individuals = get_individuals(labels)
        self.bodyparts = get_bodyparts(labels)
        n_frames = data.shape[0]
        n_individuals = len(self.individuals)
        n_bodyparts = len(self.bodyparts)
        sizeof_coords = 3
        self.data = np.reshape(
            data, (n_frames, n_individuals, n_bodyparts, sizeof_coords))

    @ classmethod
    def from_pandas(cls, dataframe: pd.DataFrame):
        labels = get_labels_from_pandas(dataframe)
        data = dataframe.to_numpy()
        return cls(labels, data)

    def __iter__(self):
        self.current_frame = 0
        return self

    def __next__(self) -> DlcFrameResults:
        if self.current_frame < len(self):
            frame = self[self.current_frame]
            self.current_frame += 1
            return frame
        else:
            raise StopIteration

    def __getitem__(self, i) -> DlcFrameResults:
        results_individuals = []
        for individual_index, individual_data in enumerate(self.data[i]):
            individual_name = self.individuals[individual_index]
            results_bodyparts = []
            for bodypart_index, bodypart_data in enumerate(individual_data):
                bodypart_name = self.bodyparts[bodypart_index]
                bodypart_coords = Coords(
                    x=bodypart_data[0], y=bodypart_data[1], likelihood=bodypart_data[2])
                bodypart = Bodypart(name=bodypart_name, coords=bodypart_coords)
                results_bodyparts.append(bodypart)
            individual = Individual(
                name=individual_name, bodyparts=results_bodyparts)
            results_individuals.append(individual)
        return DlcFrameResults(individuals=results_individuals)

    def __len__(self):
        return self.data.shape[0]


def get_labels(individuals: List[str], bodyparts: List[str]) -> List[DlcResultLabel]:
    labels = []
    coords = ['x', 'y', 'likelihood']
    for indiv in individuals:
        for bp in bodyparts:
            for coord_name in coords:
                label = DlcResultLabel(individual=indiv, bodypart=bp,
                                       coord_name=coord_name)
                labels.append(label)
    return labels


def get_individuals(labels: List[DlcResultLabel]) -> List[str]:
    individuals = []
    for label in labels:
        if label.individual not in individuals:
            individuals.append(label.individual)
    return individuals


def get_bodyparts(labels: List[DlcResultLabel]) -> List[str]:
    bodyparts = []
    for label in labels:
        if label.bodypart not in bodyparts:
            bodyparts.append(label.bodypart)
    return bodyparts


def get_labels_from_pandas(dataframe: pd.DataFrame) -> List[DlcResultLabel]:
    labels = []
    for key in dataframe.keys():
        labels.append(DlcResultLabel(
            individual=key[1], bodypart=key[2], coord_name=key[3]))
    return labels


@dataclass
class DlcResultLabel:
    individual: str
    bodypart: str
    coord_name: str


@dataclass
class DlcFrameResults:
    individuals: List[Individual]


@dataclass
class Individual:
    name: str
    bodyparts: List[Bodypart]


@dataclass
class Bodypart:
    name: str
    coords: Coords


@dataclass
class Coords:
    x: float
    y: float
    likelihood: float
