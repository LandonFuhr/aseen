from analysis_lib.behaviour.arena_setup_adapter import get_arena_setup_from_dict, CircleGeometry, RectangleGeometry


def test_it_reads_id():
    arena_setup = get_arena_setup_from_dict(fake_arena_setup)
    area0 = arena_setup.areas[0]
    assert area0._id == "Chamber 1"


def test_it_reads_circle_geometry():
    arena_setup = get_arena_setup_from_dict(fake_arena_setup)
    area0 = arena_setup.areas[0]
    assert isinstance(area0.geometry, CircleGeometry)
    assert area0.geometry.center.x == 100
    assert area0.geometry.center.y == 200
    assert area0.geometry.radius_x == 50
    assert area0.geometry.radius_y == 75
    assert area0.geometry.rotation == 0


def test_it_reads_rectangle_geometry():
    arena_setup = get_arena_setup_from_dict(fake_arena_setup)
    area0 = arena_setup.areas[1]
    assert isinstance(area0.geometry, RectangleGeometry)
    assert area0.geometry.top_left.x == 100
    assert area0.geometry.top_left.y == 200
    assert area0.geometry.width == 50
    assert area0.geometry.height == 75
    assert area0.geometry.rotation == 12.4


def test_it_reads_color_palette():
    arena_setup = get_arena_setup_from_dict(fake_arena_setup)
    area0 = arena_setup.areas[0]
    assert area0.color_palette.active.fill == "rgba(0,0,0,0.2)"
    assert area0.color_palette.active.border == "rgba(0,0,0,1)"
    assert area0.color_palette.inactive.fill == "rgba(0,0,0,0.05)"
    assert area0.color_palette.inactive.border == "rgba(0,0,0,0.2)"


def test_it_reads_both_areas_and_interaction_zones():
    arena_setup = get_arena_setup_from_dict(fake_arena_setup)
    assert len(arena_setup.areas) == 2
    assert len(arena_setup.interaction_zones) == 1


fake_arena_setup = {
    "areas": [
        {
            "id": "Chamber 1",
            "geometry": {
                "type": "circle",
                "center": {
                    "x": 100,
                    "y": 200
                },
                "radiusX": 50,
                "radiusY": 75,
                "rotation": 0
            },
            "colorPalette": {
                "active": {
                    "fill": "rgba(0,0,0,0.2)",
                    "border": "rgba(0,0,0,1)"
                },
                "inactive": {
                    "fill": "rgba(0,0,0,0.05)",
                    "border": "rgba(0,0,0,0.2)"
                }
            }
        },
        {
            "id": "Chamber 2",
            "geometry": {
                "type": "rectangle",
                "topLeft": {
                    "x": 100,
                    "y": 200
                },
                "width": 50,
                "height": 75,
                "rotation": 12.4
            },
            "colorPalette": {
                "active": {
                    "fill": "rgba(0,0,0,0.2)",
                    "border": "rgba(0,0,0,1)"
                },
                "inactive": {
                    "fill": "rgba(0,0,0,0.05)",
                    "border": "rgba(0,0,0,0.2)"
                }
            }
        }
    ],
    "interactionZones": [
        {
            "id": "Chamber 2",
            "geometry": {
                "type": "rectangle",
                "topLeft": {
                    "x": 100,
                    "y": 200
                },
                "width": 50,
                "height": 75,
                "rotation": 0
            },
            "colorPalette": {
                "active": {
                    "fill": "rgba(0,0,0,0.2)",
                    "border": "rgba(0,0,0,1)"
                },
                "inactive": {
                    "fill": "rgba(0,0,0,0.05)",
                    "border": "rgba(0,0,0,0.2)"
                }
            }
        }
    ]
}
