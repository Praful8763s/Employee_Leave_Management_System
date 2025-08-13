#!/usr/bin/env python
"""
Script to reset the database and migrations
"""
import os
import shutil
import sqlite3
from pathlib import Path

def reset_database():
    """Reset the SQLite database"""
    db_path = Path('db.sqlite3')
    if db_path.exists():
        try:
            # Close any existing connections
            conn = sqlite3.connect(str(db_path))
            conn.close()
            
            # Remove the database file
            os.remove(str(db_path))
            print("✓ Database file removed")
        except Exception as e:
            print(f"Warning: Could not remove database file: {e}")
    else:
        print("✓ No database file to remove")

def reset_migrations():
    """Reset migration files"""
    apps = ['accounts', 'leaves']
    
    for app in apps:
        migrations_dir = Path(app) / 'migrations'
        if migrations_dir.exists():
            # Remove all migration files except __init__.py
            for file in migrations_dir.glob('*.py'):
                if file.name != '__init__.py':
                    try:
                        os.remove(file)
                        print(f"✓ Removed {file}")
                    except Exception as e:
                        print(f"Warning: Could not remove {file}: {e}")
            
            # Remove __pycache__ directory
            pycache_dir = migrations_dir / '__pycache__'
            if pycache_dir.exists():
                try:
                    shutil.rmtree(pycache_dir)
                    print(f"✓ Removed {pycache_dir}")
                except Exception as e:
                    print(f"Warning: Could not remove {pycache_dir}: {e}")

def main():
    print("Resetting Django database and migrations...")
    print("=" * 50)
    
    reset_database()
    reset_migrations()
    
    print("\n✓ Reset complete!")
    print("\nNext steps:")
    print("1. python manage.py makemigrations")
    print("2. python manage.py migrate")
    print("3. python manage.py createsuperuser")

if __name__ == "__main__":
    main()