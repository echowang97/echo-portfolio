#!/usr/bin/env python3
# 本地预览用：带 no-store，避免浏览器缓存旧 JS/CSS。仅开发用。
# 跑法：python3 serve.py [port]
import http.server, socketserver, os, sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5180


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()


with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"serving on http://localhost:{PORT}")
    httpd.serve_forever()
