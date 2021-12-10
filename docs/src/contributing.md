---
label: Code Contribution
icon: code-review
order: -100
---

# Contributing

## Development Environment Setup

### System Requirements

- **NodeJS >=v12** | Tested with v12.18.1
- **Python 64-bit, >=3.4 & <=3.7** | Python 32-bit or versions >=3.8 don't support _tensorflow 1.15_, which is required for <a href="https://github.com/DeepLabCut/DeepLabCut" target="_blank">DeepLabCut</a>. Tested with 3.7.1 64-bit

### 1. Clone the respository

!!!
**Windows Users**

This must be done at the root of a drive, e.g. C:\ or D:\\. The build process will fail otherwise. If the repo is not at the base of a drive, then the path to some files while building will be too long and will throw an error.
!!!

```
git clone https://github.com/LandonFuhr/aseen
cd aseen
```

### 2. Install Dependencies

#### a. Node Dependencies

Install top-level dependecies for electron

```
npm install
```

Install React dependencies

```
cd src/frontend
npm install
cd ../..
```

#### b. Python dependencies

!!!
Make sure this is using the correct python version. If needed, replace `python` with `C:\path\to\python.exe` in the command below
!!!
Check Python version to make sure it is supported. Check to make sure that the version matches the [System Requirements](#system-requirements)

```
python -c "import struct,platform; print(f\"Python {platform.python_version()} {struct.calcsize('P')*8}-bit\")"
```

Create virtual environment. If the default Python version is not the correct one, then replace `python` in the command below with `C:\path\to\python.exe`

```
python -m venv venv
```

Activate virtual environment

+++ Windows

```
venv\Scripts\activate.bat
```

+++ macOS

```
source venv/bin/activate
```

+++ Unix

```
source venv/bin/activate
```

+++

Install dependencies inside virtual environment

```
pip install -r requirements.txt
```

---

## Code Guidelines
