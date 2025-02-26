import 'CryptoJS', 'crypto-js'

def decode_base64()
  CryptoJS.enc.Base64.parse(self).to_string(CryptoJS.enc.Utf8)
end
String.prototype.decode_base64 = decode_base64

def encode_base64()
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(self))
end
String.prototype.encode_base64 = encode_base64

def encode_sha256()
  CryptoJS.SHA256(self).to_s
end
String.prototype.encode_sha256 = encode_sha256

def base64_split(max_segment_size_kb = 10)
  max_segment_size = max_segment_size_kb * 1024
  base64_string    = self
  segments         = []
  current_index    = 0

  while current_index < base64_string.length
    segment = base64_string.substring(current_index, current_index + max_segment_size)
    segments.push(segment)
    current_index += max_segment_size
  end

  return segments
end
String.prototype.base64_split = base64_split