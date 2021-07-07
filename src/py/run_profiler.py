import cProfile
import pstats
import numpy as np

from analysis_lib.behaviour.analyze_behaviour import simple_behavioural_assay_algorithm
from analysis_lib.dlc_results_adapter import DlcResults, get_labels
from analysis_lib.behaviour.arena_setup_adapter import ArenaSetup, Point, RectangleGeometry, Region

dlc_results = DlcResults(
    get_labels(['Mouse 1', 'Mouse 2'], ['ear_left',
               'ear_right', 'head', 'other', 'other1']),
    np.zeros((10000, 30), dtype=float))
region = Region(_id=None,
                geometry=RectangleGeometry(
                    top_left=Point(x=-1, y=-1),
                    width=3, height=3, rotation=0), color_palette=None)
arena_setup = ArenaSetup(
    areas=[region] * 3,
    interaction_zones=[region] * 2)

cProfile.run(
    'simple_behavioural_assay_algorithm(arena_setup=arena_setup, dlc_results=dlc_results)', 'stats')

p = pstats.Stats('stats')
p.strip_dirs()
p.sort_stats(pstats.SortKey.CUMULATIVE)
p.print_stats()
