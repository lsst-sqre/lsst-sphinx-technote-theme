"""Sphinx theme for LSST Data Management technical notes and design
documentation.

See https://github.com/lsst-sqre/lsst_sphinx_technote_theme for more info.
"""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import pkg_resources

# Setup namespace
from .config import configure_with_metadata  # NOQA

_pkg_name = 'lsst_sphinx_technote_theme'
__version__ = pkg_resources.get_distribution(_pkg_name).version
