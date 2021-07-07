import shutil
import os
import pytest
import pandas as pd

from analysis_lib.tracking.run_inference import run_analysis


dir_path = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), 'test_data')
temp_dir = os.path.join(dir_path, 'temp')

video_path = os.path.join(dir_path, 'vid.mp4')
expected_results_path = os.path.join(dir_path, 'expected_results.h5')
output_path = os.path.join(temp_dir, 'nested', 'tracking_results.h5')
temp_video_path = os.path.join(temp_dir, 'vid.mp4')


@pytest.fixture()
def correct_h5_results():
    data = pd.read_hdf(expected_results_path)
    os.mkdir(temp_dir)
    shutil.copyfile(video_path, temp_video_path)
    yield data
    shutil.rmtree(temp_dir)


@pytest.mark.integration
def test_it_creates_h5_file_with_correct_data(correct_h5_results):
    path_config_file = os.path.join(dir_path, 'example-dlc', 'config.yaml')

    run_analysis(path_config_file, temp_video_path, output_path)

    assert pd.read_hdf(output_path).equals(correct_h5_results)


@pytest.mark.integration
def test_it_removes_default_output_files(correct_h5_results):
    path_config_file = os.path.join(dir_path, 'example-dlc', 'config.yaml')

    run_analysis(path_config_file, temp_video_path, output_path)

    for file in os.listdir(temp_dir):
        filename = os.fsdecode(file)
        assert "vidDLC" not in filename
