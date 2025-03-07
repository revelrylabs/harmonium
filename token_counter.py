#!/usr/bin/env python3
"""
Token Counter - Estimates tokens in files for AI context windows
"""

import os
import re
import argparse
from pathlib import Path
# Optional import of tiktoken
try:
    import tiktoken
    TIKTOKEN_AVAILABLE = True
except ImportError:
    TIKTOKEN_AVAILABLE = False

# Different encoders for different models
ENCODERS = {
    "gpt-3.5-turbo": "cl100k_base",  # Also used by gpt-4
    "gpt-3": "p50k_base",
    "davinci": "p50k_base",
    "claude": "cl100k_base",  # Approximation, Claude uses its own tokenizer
}


def count_tokens_tiktoken(text, model="gpt-3.5-turbo"):
    """Count tokens using tiktoken library (for OpenAI models)"""
    if not TIKTOKEN_AVAILABLE:
        return estimate_tokens_simple(text)
        
    encoding_name = ENCODERS.get(model, "cl100k_base")
    encoding = tiktoken.get_encoding(encoding_name)
    return len(encoding.encode(text))


def estimate_tokens_simple(text):
    """
    Fallback simple token estimation if tiktoken isn't available
    This is a rough approximation based on whitespace and punctuation
    """
    # Split by whitespace
    words = text.split()
    
    # Count punctuation and special characters that often become separate tokens
    punctuation = len(re.findall(r'[.,!?;:()[\]{}"\'-]', text))
    
    # Count numbers
    numbers = len(re.findall(r'\d+', text))
    
    # Estimate: most words are 1 token, but some long words might be more
    # Plus add punctuation which often gets tokenized separately
    return len(words) + punctuation + numbers


def process_file(filepath, model="gpt-3.5-turbo", use_tiktoken=TIKTOKEN_AVAILABLE):
    """Process a single file and return its token count"""
    try:
        # Try to read the file with utf-8 encoding
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            
        if use_tiktoken:
            token_count = count_tokens_tiktoken(content, model)
        else:
            token_count = estimate_tokens_simple(content)
            
        return token_count, use_tiktoken
        
    except UnicodeDecodeError:
        # If utf-8 decoding fails, the file might be binary or using a different encoding
        return 0, use_tiktoken
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return 0, use_tiktoken


def process_directory(directory_path, model="gpt-3.5-turbo", extensions=None, verbose=False):
    """Process all files in a directory and calculate total tokens"""
    directory = Path(directory_path)
    if not directory.exists() or not directory.is_dir():
        print(f"Error: {directory_path} is not a valid directory")
        return
    
    total_tokens = 0
    file_count = 0
    use_tiktoken = TIKTOKEN_AVAILABLE  # Use tiktoken if available
    
    try:
        for filepath in directory.glob('**/*'):
            # Skip directories
            if filepath.is_dir():
                continue
                
            # Check file extension if extensions filter is provided
            if extensions and filepath.suffix.lower() not in extensions:
                continue
                
            # Process file
            tokens, use_tiktoken = process_file(filepath, model, use_tiktoken)
            
            if tokens > 0:
                file_count += 1
                total_tokens += tokens
                if verbose:
                    print(f"{filepath}: {tokens:,} tokens")
    
        # Print summary
        print(f"\nSummary:")
        print(f"Processed {file_count} files in {directory_path}")
        print(f"Estimated total tokens: {total_tokens:,} tokens")
        print(f"Token counting method: {'tiktoken' if use_tiktoken else 'simple estimation'}")
        print(f"Model encoding: {model}")
        
        return total_tokens
        
    except KeyboardInterrupt:
        print("\nOperation interrupted by user.")
        return total_tokens


def main():
    parser = argparse.ArgumentParser(description="Estimate token count in files for AI context windows")
    parser.add_argument("directory", type=str, help="Directory containing files to analyze")
    parser.add_argument("--model", type=str, default="gpt-3.5-turbo", 
                        choices=list(ENCODERS.keys()),
                        help="AI model to estimate tokens for")
    parser.add_argument("--extensions", type=str, 
                        help="Comma-separated list of file extensions to process (e.g., .txt,.py,.md)")
    parser.add_argument("--verbose", action="store_true", help="Show token count for each file")
    
    args = parser.parse_args()
    
    # Process extensions if provided
    ext_list = None
    if args.extensions:
        ext_list = [ext.strip() if ext.strip().startswith('.') else f'.{ext.strip()}' 
                   for ext in args.extensions.split(',')]
    
    if TIKTOKEN_AVAILABLE:
        print("Using tiktoken for accurate token counting")
    else:
        print("Using simple estimation (install tiktoken for better accuracy)")
    
    # Process the directory
    process_directory(args.directory, args.model, ext_list, args.verbose)


if __name__ == "__main__":
    main()