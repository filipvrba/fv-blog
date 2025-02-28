import 'CryptoJS',   'crypto-js'
import 'markdownit', 'markdown-it'
import 'hljs',       'highlight.js'

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

def shorten_text(max_length = 150)
  text = self.split("\n").first
  if text.length > max_length
    return text.slice(0, max_length) + "..."
  else
    return text
  end
end
String.prototype.shorten_text = shorten_text

def md_to_html()
  options = {
    html: true,
    highlight: lambda do |str, lang|

      if lang && hljs.getLanguage(lang)
        begin
          return hljs.highlight(str, { language: lang }).value
        rescue
        end
      end
  
      return '' # use external default escaping
    end
  }
  md = markdownit(options)
  md.render(self)
end
String.prototype.md_to_html = md_to_html