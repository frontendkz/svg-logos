"""Generates JSON file with logos data"""
import os
import os.path as op
import json

scan_path = op.join(op.curdir, "catalog")

def get_folders():
    """Returns a list of folder"""
    folders = []
    for item in os.listdir(scan_path):
        if op.isdir(op.join(scan_path, item)):
            folders.append(item)
    # folders.remove(".git")
    return folders

def get_logos(folder):
    """Returns a list of logos files from given folder"""
    logos = []
    for logo in os.listdir(op.join(scan_path, folder)):
        logos.append(logo)
    return logos

if __name__ == '__main__':
    results = []

    for folder in get_folders():
        for logo in get_logos(folder):
            results.append({"name": logo, "category": folder})

    with open("logos.json", "w") as logos:
        json.dump(results, logos, indent=4)
