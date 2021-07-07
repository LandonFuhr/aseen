import json
import os

from analysis_lib.tracking.run_inference import run_analysis


CONFIG_YAML_PATH = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), 'dlc_project', 'config.yaml')


def main():
    args = json.loads(input())

    run_analysis(CONFIG_YAML_PATH, args['videoPath'], args['outputH5Path'])


if __name__ == "__main__":
    main()
