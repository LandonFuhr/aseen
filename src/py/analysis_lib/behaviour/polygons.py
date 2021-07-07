from typing import Union
from shapely import geometry, affinity

from analysis_lib.behaviour.arena_setup_adapter import CircleGeometry, RectangleGeometry


def polygon_from_shape(shape: Union[RectangleGeometry, CircleGeometry]) -> geometry.Polygon:
    if isinstance(shape, RectangleGeometry):
        return polygon_from_rect(shape)
    if isinstance(shape, CircleGeometry):
        return polygon_from_circle(shape)


def polygon_from_rect(rect: RectangleGeometry) -> geometry.Polygon:
    x = rect.top_left.x
    y = rect.top_left.y
    top_left = [x, y]
    top_right = [x + rect.width, y]
    bottom_right = [x + rect.width, y + rect.height]
    bottom_left = [x, y + rect.height]
    polygon = geometry.Polygon(
        [top_left, top_right, bottom_right, bottom_left])
    if rect.rotation != 0:
        polygon = affinity.rotate(polygon, rect.rotation)
    return polygon


def polygon_from_circle(circle: CircleGeometry) -> geometry.Polygon:
    polygon = geometry.Point(circle.center.x, circle.center.y).buffer(1)
    polygon = affinity.scale(polygon, circle.radius_x, circle.radius_y)
    if circle.rotation != 0:
        polygon = affinity.rotate(polygon, circle.rotation)
    return polygon
