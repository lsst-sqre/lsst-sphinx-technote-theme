#!/usr/bin/env python
#
# Sphinx configuration file
# see metadata.yaml in this repo to update document-specific metadata

import os
from lsst_sphinx_technote_theme import configure_with_metadata

# Ingest settings from metadata.yaml and use theme's
# configure_with_metadata to build a Sphinx configuration that is
# injected into this script's global namespace.
metadata_path = os.path.join(os.path.dirname(__file__), 'metadata.yaml')
with open(metadata_path, 'r') as f:
    confs = configure_with_metadata(f)
g = globals()
g.update(confs)
