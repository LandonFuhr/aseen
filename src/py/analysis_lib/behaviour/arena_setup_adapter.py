from __future__ import annotations
from dataclasses import dataclass
from typing import List, Union


def get_arena_setup_from_dict(arena_setup_dict: dict) -> ArenaSetup:
    areas = [get_region(area) for area in arena_setup_dict['areas']]
    interaction_zones = [get_region(
        interaction_zone) for interaction_zone in arena_setup_dict["interactionZones"]]
    return ArenaSetup(areas=areas, interaction_zones=interaction_zones)


def get_region(region_dict: dict) -> Region:
    _id = region_dict['id']
    geometry = get_geometry(region_dict['geometry'])
    color_palette = get_color_palette(region_dict['colorPalette'])
    return Region(_id=_id, geometry=geometry, color_palette=color_palette)


def get_color_palette(color_palette_dict: dict) -> ColorPalette:
    active = get_color_data(color_palette_dict['active'])
    inactive = get_color_data(color_palette_dict['inactive'])
    return ColorPalette(active=active, inactive=inactive)


def get_color_data(color_data_dict: dict) -> ColorData:
    fill = color_data_dict['fill']
    border = color_data_dict['border']
    return ColorData(fill=fill, border=border)


def get_geometry(geometry_dict: dict) -> Union[CircleGeometry, RectangleGeometry]:
    _type = geometry_dict['type']
    if _type == "circle":
        return get_circle_geometry(geometry_dict)
    if _type == "rectangle":
        return get_rectangle_geometry(geometry_dict)


def get_circle_geometry(circle_geometry_dict: dict) -> CircleGeometry:
    center_dict = circle_geometry_dict['center']
    center = get_point(center_dict)
    radius_x = circle_geometry_dict['radiusX']
    radius_y = circle_geometry_dict['radiusY']
    rotation = circle_geometry_dict['rotation']
    return CircleGeometry(center=center, radius_x=radius_x, radius_y=radius_y, rotation=rotation)


def get_rectangle_geometry(rectangle_geometry_dict: dict) -> RectangleGeometry:
    top_left_dict = rectangle_geometry_dict['topLeft']
    top_left = get_point(top_left_dict)
    width = rectangle_geometry_dict['width']
    height = rectangle_geometry_dict['height']
    rotation = rectangle_geometry_dict['rotation']
    return RectangleGeometry(top_left=top_left, width=width, height=height, rotation=rotation)


def get_point(point_dict: dict) -> Point:
    x = point_dict['x']
    y = point_dict['y']
    return Point(x=x, y=y)


@dataclass
class ArenaSetup:
    areas: List[Region]
    interaction_zones: List[Region]


@dataclass
class Region:
    _id: str
    geometry: Union[CircleGeometry, RectangleGeometry]
    color_palette: ColorPalette


@dataclass
class ColorPalette:
    active: ColorData
    inactive: ColorData


@dataclass
class ColorData:
    fill: str
    border: str


@dataclass
class RectangleGeometry:
    top_left: Point
    width: float
    height: float
    rotation: float


@dataclass
class CircleGeometry:
    center: Point
    radius_x: float
    radius_y: float
    rotation: float


@dataclass
class Point:
    x: float
    y: float
