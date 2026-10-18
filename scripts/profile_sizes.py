import os, gzip

try:
    import brotli
    has_brotli = True
except ImportError:
    has_brotli = False

def get_dir_stats(path):
    total_raw = 0
    total_gz = 0
    total_br = 0
    file_types = {}
    file_list = []
    for r, d, fs in os.walk(path):
        for f in fs:
            fp = os.path.join(r, f)
            sz = os.path.getsize(fp)
            total_raw += sz
            ext = os.path.splitext(f)[1] or f
            file_types[ext] = file_types.get(ext, 0) + sz
            gz_sz = 0
            br_sz = 0
            try:
                with open(fp, 'rb') as fh:
                    data = fh.read()
                    gz_data = gzip.compress(data, 9)
                    gz_sz = len(gz_data)
                    total_gz += gz_sz
                    if has_brotli:
                        br_data = brotli.compress(data, quality=11)
                        br_sz = len(br_data)
                        total_br += br_sz
            except Exception as e:
                pass
            file_list.append((fp, sz, gz_sz, br_sz))
    return total_raw, total_gz, total_br, file_types, file_list

raw, gz, br, types, files = get_dir_stats('out')
print(f'TOTAL out: {raw:,} bytes ({raw/1024/1024:.2f} MB)')
print(f'GZIP:      {gz:,} bytes ({gz/1024/1024:.2f} MB)')
if has_brotli:
    print(f'BROTLI:    {br:,} bytes ({br/1024/1024:.2f} MB)')
print('\n--- Breakdown by Extension ---')
for ext, sz in sorted(types.items(), key=lambda x: x[1], reverse=True):
    print(f'  {ext:10s}: {sz:>10,} bytes ({sz/1024:>7.1f} KB)')

if os.path.exists('out/_next/static/chunks'):
    c_raw, c_gz, c_br, _, c_files = get_dir_stats('out/_next/static/chunks')
    print('\n--- Chunks Directory (JS + CSS) ---')
    print(f'  Total Raw:    {c_raw:>10,} bytes ({c_raw/1024:.1f} KB)')
    print(f'  Total Gzip:   {c_gz:>10,} bytes ({c_gz/1024:.1f} KB)')
    if has_brotli:
        print(f'  Total Brotli: {c_br:>10,} bytes ({c_br/1024:.1f} KB)')
    print('\n--- Top 15 Largest Files in out/ ---')
    c_files.sort(key=lambda x: x[1], reverse=True)
    for fp, sz, gsz, bsz in c_files[:15]:
        rel = os.path.relpath(fp, 'out')
        print(f'  {rel:45s}: raw={sz:>8,} B | gz={gsz:>7,} B')
