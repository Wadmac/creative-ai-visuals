import struct, zlib, os

W, H = 400, 560

def make_png(w, h):
    def chunk(chunk_type, data):
        c = chunk_type + data
        crc = struct.pack('>I', zlib.crc32(c) & 0xffffffff)
        return struct.pack('>I', len(data)) + c + crc
    
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
    
    raw = b''
    for y in range(h):
        raw += b'\x00'
        for x in range(w):
            cx = abs(x - w // 2) / (w // 2)
            cy = abs(y - h // 2) / (h // 2)
            dist = (cx * cx + cy * cy) ** 0.5
            factor = max(0, 1 - dist * 0.6)
            cr = int(10 + 8 * factor)
            cg = int(15 + 10 * factor)
            cb = int(26 + 15 * factor)
            raw += struct.pack('BBB', cr, cg, cb)
    
    compressed = zlib.compress(raw)
    idat = chunk(b'IDAT', compressed)
    iend = chunk(b'IEND', b'')
    
    return sig + ihdr + idat + iend

os.makedirs('public', exist_ok=True)
png_data = make_png(W, H)
with open('public/portrait.png', 'wb') as f:
    f.write(png_data)
print(f'Created portrait.png ({len(png_data)} bytes, {W}x{H})')
