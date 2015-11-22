import os
from setuptools import setup

PACKAGENAME = 'lsst-sphinx-technote-theme'
DESCRIPTION = 'Sphinx theme and configurtation for LSST Data Management ' \
              'Technical Notes'
AUTHOR = 'Jonathan Sick'
AUTHOR_EMAIL = 'jsick@lsst.org'
LICENSE = 'MIT'
URL = 'https://github.com/lsst-sqre/lsst-sphinx-technote-theme'
VERSION = '0.1.0.dev0'


def read(filename):
    full_filename = os.path.join(
        os.path.abspath(os.path.dirname(__file__)),
        filename)
    return open(full_filename).read()

long_description = read('README.rst')


setup(
    name=PACKAGENAME,
    version=VERSION,
    description=DESCRIPTION,
    long_description=long_description,
    url=URL,
    author=AUTHOR,
    author_email=AUTHOR_EMAIL,
    license=LICENSE,
    classifiers=[
        'Development Status :: 4 - Beta',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Environment :: Console',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
    ],
    keywords='sphinx documentation lsst',
    packages=['lsst_sphinx_technote_theme'],
    zip_safe=False,
    package_data={'lsst_sphinx_technote_theme': ['theme.conf',
                                                 '*.html',
                                                 'static/css/*.css',
                                                 'static/js/*.js']},
    include_package_data=True,
    install_requires=['documenteer>=0.2.0.dev0'],
    tests_require=[],
    # package_data={},
)
