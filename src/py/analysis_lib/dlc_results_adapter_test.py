import numpy as np

from analysis_lib.dlc_results_adapter import Coords, get_labels, DlcResults
from analysis_lib.dlc_fake_data import create_fake_dlc_tracking_data


def test_it_extracts_individuals_from_labels():
    labels = get_labels(['Mouse 1', 'Mouse 2', 'Mouse 3'], ['ear_left'])
    data = np.array(np.zeros((1, len(labels))), dtype=float)

    results = DlcResults(labels, data)

    assert results.individuals == ['Mouse 1', 'Mouse 2', 'Mouse 3']


def test_it_extracts_bodyparts_from_labels():
    labels = get_labels(['Mouse 1'], ['ear_left', 'ear_right', 'head'])
    data = np.array(np.zeros((1, len(labels))), dtype=float)

    results = DlcResults(labels, data)

    assert results.bodyparts == ['ear_left', 'ear_right', 'head']


def test_its_length_is_the_number_of_frames():
    n_frames = 4
    labels = get_labels(['Mouse 1'], ['ear_left'])
    data = np.array(np.zeros((n_frames, len(labels))), dtype=float)

    results = DlcResults(labels, data)

    assert len(results) == n_frames


def test_it_iterates_over_all_frames():
    labels = get_labels(['Mouse 1', 'Mouse 2'], ['ear_left', 'ear_right'])
    data = np.array(np.random.rand(2, 12), dtype=float)

    results = DlcResults(labels, data)

    all_iteration_results = []
    for frame_results in results:
        frame_interation_results = []
        for individual in frame_results.individuals:
            for bodypart in individual.bodyparts:
                frame_interation_results.append(
                    [individual.name, bodypart.name, bodypart.coords])
        all_iteration_results.append(frame_interation_results)

    assert all_iteration_results == [
        [['Mouse 1', 'ear_left', Coords(x=data[0][0],
                                        y=data[0][1],
                                        likelihood=data[0][2])],
         ['Mouse 1', 'ear_right', Coords(x=data[0][3],
                                         y=data[0][4],
                                         likelihood=data[0][5])],
         ['Mouse 2', 'ear_left', Coords(x=data[0][6],
                                        y=data[0][7],
                                        likelihood=data[0][8])],
         ['Mouse 2', 'ear_right', Coords(x=data[0][9],
                                         y=data[0][10],
                                         likelihood=data[0][11])]
         ],
        [['Mouse 1', 'ear_left', Coords(x=data[1][0],
                                        y=data[1][1],
                                        likelihood=data[1][2])],
         ['Mouse 1', 'ear_right', Coords(x=data[1][3],
                                         y=data[1][4],
                                         likelihood=data[1][5])],
         ['Mouse 2', 'ear_left', Coords(x=data[1][6],
                                        y=data[1][7],
                                        likelihood=data[1][8])],
         ['Mouse 2', 'ear_right', Coords(x=data[1][9],
                                         y=data[1][10],
                                         likelihood=data[1][11])]
         ]
    ]


def test_it_converts_results_from_pandas_dataframe():
    individuals = ['Mouse 1', 'Mouse 2']
    bodyparts = ['ear_left', 'ear_right', 'head']
    data = np.array([
        [10, 10, 1.0, 30, 30, 1.0, 45, 65, 1.0,
         10, 10, 1.0, 30, 30, 1.0, 45, 65, 1.0]])
    fake_dlc_results = create_fake_dlc_tracking_data(
        individuals, bodyparts, data)

    results = DlcResults.from_pandas(fake_dlc_results)

    assert results.individuals == individuals
    assert results.bodyparts == bodyparts
    assert np.array_equal(np.reshape(results.data, -1), np.reshape(data, -1))
