#!/bin/bash

set -e

pnpm -r run build

FINAL_DIR="dist"

rm -rf $FINAL_DIR
mkdir -p $FINAL_DIR

# 先放 slax-home（处理 / /blog 以及其他所有路径）
cp -r apps/slax-home/dist/* $FINAL_DIR/

# 再放子应用，覆盖 slax-home 中可能存在的同名目录
# reader-home → /reader
mkdir -p $FINAL_DIR/reader
cp -r apps/reader-home/dist/* $FINAL_DIR/reader/

# note-home → /note
mkdir -p $FINAL_DIR/note
cp -r apps/note-home/dist/* $FINAL_DIR/note/

# 合并 sitemap：生成顶级 sitemap-index.xml 聚合所有子应用的 sitemap
# 备份 slax-home 自己的 sitemap（如果存在）
if [ -f "$FINAL_DIR/sitemap-index.xml" ]; then
	# 将 slax-home 的 sitemap-index 重命名，避免被覆盖
	mv "$FINAL_DIR/sitemap-index.xml" "$FINAL_DIR/sitemap-home-index.xml"
fi

cat > "$FINAL_DIR/sitemap-index.xml" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://slax.com/sitemap-home-index.xml</loc></sitemap>
  <sitemap><loc>https://slax.com/reader/sitemap-index.xml</loc></sitemap>
  <sitemap><loc>https://slax.com/note/sitemap-index.xml</loc></sitemap>
</sitemapindex>
EOF

echo "Build complete. Combined output in $FINAL_DIR/"
echo "Sitemap index: $FINAL_DIR/sitemap-index.xml"
