/**
 * Bộ vẽ biểu đồ Vaga D.I.S.C bằng HTML5 Canvas thuần
 * (Hỗ trợ màn hình Retina / High-DPI, Responsive Mobile & Widescreen Desktop, In PDF A4)
 */
window.DISCChartRenderer = (function () {
  const COLORS = {
    D: '#e11d48',
    I: '#d97706',
    S: '#059669',
    C: '#2563eb'
  };

  function setupHiDPICanvas(canvas, logicalWidth, logicalHeight) {
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.maxWidth = `${logicalWidth}px`;
    canvas.style.height = 'auto';
    canvas.style.aspectRatio = `${logicalWidth} / ${logicalHeight}`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  /**
   * Vẽ biểu đồ Radar 4 trục (D - I - S - C)
   * Hỗ trợ cả bài Likert 0-100 và bài Most/Least 24 câu
   */
  function renderRadarChart(canvas, resultData) {
    if (!canvas || !resultData) return;

    const width = 440;
    const height = 350;
    const ctx = setupHiDPICanvas(canvas, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 10;
    const maxRadius = 104;

    ctx.clearRect(0, 0, width, height);

    const axes = [
      { key: 'D', label: 'D (Chủ động)', angle: -Math.PI / 2, color: COLORS.D },
      { key: 'I', label: 'I (Ảnh hưởng)', angle: 0, color: COLORS.I },
      { key: 'S', label: 'S (Kiên định)', angle: Math.PI / 2, color: COLORS.S },
      { key: 'C', label: 'C (Chuẩn xác)', angle: Math.PI, color: COLORS.C }
    ];

    const levels = [0.25, 0.5, 0.75, 1.0];
    for (const lv of levels) {
      const r = maxRadius * lv;
      ctx.beginPath();
      axes.forEach((axis, idx) => {
        const x = centerX + r * Math.cos(axis.angle);
        const y = centerY + r * Math.sin(axis.angle);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = lv === 1.0 ? 'rgba(241, 245, 249, 0.55)' : 'transparent';
      if (lv === 1.0) ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = lv === 0.5 || lv === 1.0 ? 1.25 : 0.85;
      ctx.stroke();
    }

    axes.forEach((axis) => {
      const endX = centerX + maxRadius * Math.cos(axis.angle);
      const endY = centerY + maxRadius * Math.sin(axis.angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.stroke();

      const labelDist = maxRadius + 24;
      const lx = centerX + labelDist * Math.cos(axis.angle);
      const ly = centerY + labelDist * Math.sin(axis.angle);

      ctx.font = 'bold 12.5px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = axis.color;
      ctx.textAlign = axis.key === 'I' ? 'left' : axis.key === 'C' ? 'right' : 'center';
      ctx.textBaseline = 'middle';
      const offsetX = axis.key === 'I' ? -10 : axis.key === 'C' ? 10 : 0;
      ctx.fillText(axis.label, lx + offsetX, ly);
    });

    const isLikert = resultData.assessment_mode && resultData.assessment_mode.startsWith('likert');
    const linear = resultData.linear_scores || { D: 50, I: 50, S: 50, C: 50 };
    const most = resultData.most_scores || { D: 6, I: 6, S: 6, C: 6 };
    const least = resultData.least_scores || { D: 6, I: 6, S: 6, C: 6 };

    const adaptedValues = isLikert
      ? {
          D: Math.min(100, Math.max(10, Number(linear.D || 50))),
          I: Math.min(100, Math.max(10, Number(linear.I || 50))),
          S: Math.min(100, Math.max(10, Number(linear.S || 50))),
          C: Math.min(100, Math.max(10, Number(linear.C || 50)))
        }
      : {
          D: Math.min(100, Math.max(12, Math.round((most.D / 15) * 100))),
          I: Math.min(100, Math.max(12, Math.round((most.I / 15) * 100))),
          S: Math.min(100, Math.max(12, Math.round((most.S / 15) * 100))),
          C: Math.min(100, Math.max(12, Math.round((most.C / 15) * 100)))
        };

    const naturalValues = isLikert
      ? {
          D: 50,
          I: 50,
          S: 50,
          C: 50
        }
      : {
          D: Math.min(100, Math.max(12, Math.round(((16 - least.D) / 16) * 100))),
          I: Math.min(100, Math.max(12, Math.round(((16 - least.I) / 16) * 100))),
          S: Math.min(100, Math.max(12, Math.round(((16 - least.S) / 16) * 100))),
          C: Math.min(100, Math.max(12, Math.round(((16 - least.C) / 16) * 100)))
        };

    function drawPolygon(valuesObj, strokeColor, fillColor, isDashed = false) {
      const points = axes.map((axis) => {
        const val = (valuesObj[axis.key] || 0) / 100;
        const r = maxRadius * val;
        return {
          x: centerX + r * Math.cos(axis.angle),
          y: centerY + r * Math.sin(axis.angle)
        };
      });

      ctx.save();
      ctx.beginPath();
      points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      if (isDashed) {
        ctx.setLineDash([5, 4]);
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      });
    }

    drawPolygon(naturalValues, '#0ea5e9', 'rgba(14, 165, 233, 0.12)', true);
    drawPolygon(adaptedValues, '#3b4cca', 'rgba(59, 76, 202, 0.24)', false);

    const legendY = height - 16;
    ctx.font = '600 12px system-ui, -apple-system, sans-serif';

    ctx.fillStyle = '#3b4cca';
    ctx.fillRect(centerX - 165, legendY - 6, 14, 10);
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'left';
    ctx.fillText(isLikert ? 'Điểm chuẩn 0-100' : 'Thích ứng (Most)', centerX - 145, legendY);

    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX + 12, legendY - 6, 14, 10);
    ctx.fillStyle = '#334155';
    ctx.fillText(isLikert ? 'Mốc cân bằng (50)' : 'Tự nhiên (Least)', centerX + 32, legendY);
  }

  /**
   * Vẽ biểu đồ Cột so sánh điểm chuẩn 0-100 & tỷ trọng 4 nhóm D - I - S - C
   */
  function renderBarChart(canvas, resultData) {
    if (!canvas || !resultData) return;

    const width = 440;
    const height = 350;
    const ctx = setupHiDPICanvas(canvas, width, height);

    ctx.clearRect(0, 0, width, height);

    const hasLinear =
      resultData.linear_scores &&
      resultData.linear_scores.D !== undefined &&
      resultData.linear_scores.D !== null;

    const scores = hasLinear
      ? resultData.linear_scores
      : resultData.percentage_scores || { D: 25, I: 25, S: 25, C: 25 };

    const percentages = resultData.percentage_scores || { D: 25, I: 25, S: 25, C: 25 };

    const padding = { top: 38, right: 24, bottom: 64, left: 48 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxScale = hasLinear ? 100 : Math.max(50, ...Object.values(scores), 60);
    const steps = hasLinear ? [0, 25, 50, 75, 100] : [0, 20, 40, 60];

    ctx.font = '11.5px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    steps.forEach((val) => {
      if (val > maxScale) return;
      const y = padding.top + chartHeight - (val / maxScale) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.strokeStyle = val === 0 ? '#94a3b8' : '#e2e8f0';
      ctx.lineWidth = val === 0 ? 1.4 : 1;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.fillText(hasLinear ? `${val}` : `${val}%`, padding.left - 10, y);
    });

    const items = [
      { key: 'D', title: 'D - Chủ động', color: COLORS.D },
      { key: 'I', title: 'I - Ảnh hưởng', color: COLORS.I },
      { key: 'S', title: 'S - Kiên định', color: COLORS.S },
      { key: 'C', title: 'C - Chuẩn xác', color: COLORS.C }
    ];

    const colWidth = chartWidth / items.length;
    const barWidth = 48;

    items.forEach((item, index) => {
      const val = Number(scores[item.key]) || 0;
      const barH = Math.max(6, (val / maxScale) * chartHeight);
      const x = padding.left + index * colWidth + (colWidth - barWidth) / 2;
      const y = padding.top + chartHeight - barH;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.beginPath();
      ctx.roundRect(x + 3, y + 3, barWidth, barH, [10, 10, 0, 0]);
      ctx.fill();

      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [10, 10, 0, 0]);
      ctx.fill();

      ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = item.color;
      ctx.textAlign = 'center';
      ctx.fillText(hasLinear ? `${val}/100` : `${val}%`, x + barWidth / 2, y - 12);

      ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#1e293b';
      ctx.fillText(item.title, x + barWidth / 2, padding.top + chartHeight + 20);

      ctx.font = '11px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`Tỷ trọng: ${percentages[item.key] ?? 25}%`, x + barWidth / 2, padding.top + chartHeight + 38);
    });
  }

  /**
   * Vẽ biểu đồ Radar đối chiếu 2 Hồ sơ trong màn So sánh Cặp 1-1 (A -> B)
   */
  function renderPairComparisonChart(canvas, viewerScores, targetScores, viewerName, targetName) {
    if (!canvas || !viewerScores || !targetScores) return;

    const width = 440;
    const height = 350;
    const ctx = setupHiDPICanvas(canvas, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 12;
    const maxRadius = 104;

    ctx.clearRect(0, 0, width, height);

    const axes = [
      { key: 'D', label: 'D (Chủ động)', angle: -Math.PI / 2, color: COLORS.D },
      { key: 'I', label: 'I (Ảnh hưởng)', angle: 0, color: COLORS.I },
      { key: 'S', label: 'S (Kiên định)', angle: Math.PI / 2, color: COLORS.S },
      { key: 'C', label: 'C (Chuẩn xác)', angle: Math.PI, color: COLORS.C }
    ];

    [0.25, 0.5, 0.75, 1.0].forEach((lv) => {
      const r = maxRadius * lv;
      ctx.beginPath();
      axes.forEach((axis, idx) => {
        const x = centerX + r * Math.cos(axis.angle);
        const y = centerY + r * Math.sin(axis.angle);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = lv === 1.0 ? 1.25 : 0.85;
      ctx.stroke();
    });

    axes.forEach((axis) => {
      const endX = centerX + maxRadius * Math.cos(axis.angle);
      const endY = centerY + maxRadius * Math.sin(axis.angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = '#94a3b8';
      ctx.stroke();

      const labelDist = maxRadius + 24;
      const lx = centerX + labelDist * Math.cos(axis.angle);
      const ly = centerY + labelDist * Math.sin(axis.angle);
      ctx.font = 'bold 12.5px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = axis.color;
      ctx.textAlign = axis.key === 'I' ? 'left' : axis.key === 'C' ? 'right' : 'center';
      ctx.textBaseline = 'middle';
      const offsetX = axis.key === 'I' ? -10 : axis.key === 'C' ? 10 : 0;
      ctx.fillText(axis.label, lx + offsetX, ly);
    });

    function drawLayer(scoresObj, strokeColor, fillColor, isDashed) {
      const pts = axes.map((axis) => {
        const val = Math.min(100, Math.max(8, Number(scoresObj[axis.key] || 50))) / 100;
        const r = maxRadius * val;
        return {
          x: centerX + r * Math.cos(axis.angle),
          y: centerY + r * Math.sin(axis.angle)
        };
      });

      ctx.save();
      ctx.beginPath();
      pts.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      if (isDashed) ctx.setLineDash([6, 4]);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      pts.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    drawLayer(targetScores, '#059669', 'rgba(16, 185, 129, 0.16)', true);
    drawLayer(viewerScores, '#3b4cca', 'rgba(59, 76, 202, 0.22)', false);

    const legendY = height - 14;
    ctx.font = '600 12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#3b4cca';
    ctx.fillRect(24, legendY - 6, 14, 10);
    ctx.fillStyle = '#1e293b';
    ctx.fillText(`(A) ${viewerName || 'Bạn'}`, 44, legendY);

    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2;
    ctx.strokeRect(width / 2 + 12, legendY - 6, 14, 10);
    ctx.fillStyle = '#1e293b';
    ctx.fillText(`(B) ${targetName || 'Đồng nghiệp'}`, width / 2 + 32, legendY);
  }

  return {
    COLORS,
    renderRadarChart,
    renderBarChart,
    renderPairComparisonChart
  };
})();
