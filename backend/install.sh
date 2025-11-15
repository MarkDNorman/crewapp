#!/bin/bash
# Quick install script for CrewLayover backend

set -e

echo "🚀 Installing CrewLayover Backend..."
echo ""

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Copy .env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created with SQLite configuration"
else
    echo "ℹ️  .env file already exists, skipping..."
fi

echo ""
echo "✨ Installation complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Activate the virtual environment: source venv/bin/activate"
echo "   2. (Optional) Edit .env file to add your OpenWeather API key"
echo "   3. Run the backend: python run.py"
echo "   4. Seed sample data: python seed_data.py"
echo ""
echo "🌐 API will be available at: http://localhost:8000"
echo "📖 API docs will be at: http://localhost:8000/docs"
echo ""
