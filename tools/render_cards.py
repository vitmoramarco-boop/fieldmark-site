import re,sys
from PIL import Image, ImageDraw, ImageFont
import os
D=os.path.dirname(os.path.abspath(__file__))
F=os.path.join(D,'fonts','Fraunces.ttf'); I=os.path.join(D,'fonts','Inter.ttf')
def font(path,size,w):
    f=ImageFont.truetype(path,size)
    try:
        axes=f.get_variation_axes(); vals=[]
        for a in axes:
            n=a.get('name',b'')
            n=n.decode() if isinstance(n,bytes) else n
            if 'eight' in n: vals.append(w)
            elif 'ptical' in n: vals.append(max(a['minimum'],min(a['maximum'],size)))
            else: vals.append(a['default'])
        f.set_variation_by_axes(vals)
    except Exception as e: print('var',e)
    return f
NAVY=(15,30,43); BRASS=(201,164,92); CREAM=(247,244,238); GREY=(138,150,163); GRID=(24,41,56)
W=1080; L=96; R=W-96; MAXW=R-L
def wrap(d,text,f,maxw):
    words=text.split(); lines=[]; cur=''
    for w in words:
        t=(cur+' '+w).strip()
        if d.textlength(t,font=f)<=maxw: cur=t
        else:
            if cur: lines.append(cur)
            cur=w
    if cur: lines.append(cur)
    return lines
def spaced(d,xy,text,f,fill,sp):
    x,y=xy
    for ch in text:
        d.text((x,y),ch,font=f,fill=fill); x+=d.textlength(ch,font=f)+sp
def render(card,out,scale=1.0):
    img=Image.new('RGB',(W,W),NAVY); d=ImageDraw.Draw(img)
    for g in range(0,W,54):
        d.line([(g,0),(g,W)],fill=GRID,width=1); d.line([(0,g),(W,g)],fill=GRID,width=1)
    spaced(d,(L,100),'FIELDMARK CONSULTANCY',font(I,24,600),BRASS,4.5)
    y=175
    blocks=[]
    if card.get('BIG'):
        s=int(170*scale)
        while True:
            fb=font(F,s,600)
            if d.textlength(card['BIG'],font=fb)<=MAXW or s<70: break
            s-=4
        blocks.append(('big',card['BIG'],fb,int(s*1.05)))
    hs=int((60 if card.get('BIG') else 76)*scale); fh=font(F,hs,400)
    for ln in wrap(d,card['HEAD'],fh,MAXW): blocks.append(('head',ln,fh,int(hs*1.2)))
    if card.get('SUB'):
        fs=font(I,int(32*scale),400); blocks.append(('gap',None,None,int(18*scale)))
        for ln in wrap(d,card['SUB'],fs,MAXW): blocks.append(('sub',ln,fs,int(32*scale*1.4)))
    if card.get('LIST'):
        fl=font(I,int(31*scale),500); blocks.append(('gap',None,None,int(26*scale)))
        for it in [x.strip() for x in card['LIST'].split(' / ')]:
            ls=wrap(d,it,fl,MAXW-40)
            for k,ln in enumerate(ls): blocks.append(('li' if k==0 else 'li2',ln,fl,int(31*scale*1.45)))
    total=sum(b[3] for b in blocks)
    if y+total>880 and scale>0.5: return render(card,out,scale-0.05)
    for kind,txt,f,h in blocks:
        if kind=='big': d.text((L-4,y),txt,font=f,fill=BRASS)
        elif kind=='head': d.text((L,y),txt,font=f,fill=CREAM)
        elif kind=='sub': d.text((L,y),txt,font=f,fill=(214,218,222))
        elif kind in('li','li2'):
            if kind=='li': d.rectangle([L,y+int(h*0.32),L+12,y+int(h*0.32)+12],fill=BRASS)
            d.text((L+40,y),txt,font=f,fill=CREAM)
        y+=h
    fsrc=font(I,21,400); sl=wrap(d,'Source: '+card['SOURCE'],fsrc,MAXW)
    sy=960-len(sl)*28
    for ln in sl: d.text((L,sy),ln,font=fsrc,fill=GREY); sy+=28
    d.text((L,975),'fieldmarkconsultancy.com',font=font(I,25,700),fill=CREAM)
    d.rectangle([0,W-14,W,W],fill=BRASS)
    img.save(out,optimize=True)

# Usage: python3 tools/render_cards.py cards.json out_dir
# cards.json = [{"file":"w3-01.png","card":{"BIG":"..","HEAD":"..","SUB":"..","LIST":"a / b / c","SOURCE":".."}}, ...]
if __name__=='__main__':
    import json,sys
    items=json.load(open(sys.argv[1])); out=sys.argv[2]; os.makedirs(out,exist_ok=True)
    for it in items: render(it['card'],os.path.join(out,it['file'])); print('ok',it['file'])
