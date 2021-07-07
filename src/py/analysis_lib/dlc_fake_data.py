import pandas as pd
import numpy as np
from typing import List


def create_fake_dlc_tracking_data(individuals: List[str], bodyparts: List[str], data: np.ndarray) -> pd.DataFrame:
    coords = ['x', 'y', 'likelihood']
    scorer_labels = ['DLC_resnet50_FAKE'] * data.shape[1]
    individual_labels = get_each_repeated(
        individuals, len(bodyparts) * len(coords))
    bodypart_labels = get_each_repeated(
        bodyparts, len(coords) * len(individuals))
    coords_labels = coords * len(bodyparts) * len(individuals)
    df = pd.DataFrame(data, columns=[
        scorer_labels,
        individual_labels,
        bodypart_labels,
        coords_labels])
    df.columns.set_names(
        ['scorer', 'individuals', 'bodyparts', 'coords'], inplace=True)
    return df


def get_each_repeated(data: List[str], n_repetitions: int):
    out = []
    for pt in data:
        out.extend([pt] * n_repetitions)
    return out


def get_bodypart_labels(bodyparts: List[str], n_points_per_bp: int) -> List[str]:
    labels = []
    for bp in bodyparts:
        labels.extend([bp] * n_points_per_bp)
    return labels


if __name__ == "__main__":
    df = create_fake_dlc_tracking_data(
        ['individual1', 'individual2'], ['bp1', 'bp2', 'bp3'], np.random.randn(5, 18))

    print(df)
