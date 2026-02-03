// Trống Đồng (Đông Sơn drum) SVG Pattern Component
// Used as subtle cultural motif throughout the website

interface TrongDongPatternProps {
	className?: string;
	opacity?: number;
	variant?: 'watermark' | 'divider' | 'badge' | 'band';
}

// Full drum pattern for watermarks
export function TrongDongWatermark({className = '', opacity = 0.05}: { className?: string; opacity?: number }) {
	const getPos = (r: number, angle: number) => {
		const rad = (angle * Math.PI) / 180;
		return {
			x: (200 + r * Math.cos(rad)).toFixed(3),
			y: (200 + r * Math.sin(rad)).toFixed(3)
		};
	};

	return (
			<div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
				<svg
						viewBox="0 0 400 400"
						className="absolute w-[600px] h-[600px] -right-48 -top-48"
						style={{opacity}}
				>
					{/* Outer concentric circles with traditional patterns */}
					<circle cx="200" cy="200" r="195" fill="none" stroke="currentColor" strokeWidth="2"/>
					<circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5"/>
					<circle cx="200" cy="200" r="165" fill="none" stroke="currentColor" strokeWidth="1"/>
					
					{/* Traditional wave/tooth pattern ring */}
					<g>
						{Array.from({length: 36}).map((_, i) => {
							const p1 = getPos(150, i * 10);
							const p2 = getPos(165, i * 10 + 5);
							const p3 = getPos(150, i * 10 + 10);
							
							return (
								<path
										key={`wave-${i}`}
										d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`}
										fill="none"
										stroke="currentColor"
										strokeWidth="1"
								/>
							);
						})}
					</g>
					
					{/* Middle decorative ring */}
					<circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1"/>
					<circle cx="200" cy="200" r="115" fill="none" stroke="currentColor" strokeWidth="2"/>
					
					{/* Traditional bird/feather patterns */}
					{Array.from({length: 12}).map((_, i) => (
							<g key={`bird-${i}`} transform={`rotate(${i * 30} 200 200)`}>
								<path
										d="M 200 80 Q 210 95 200 110 Q 190 95 200 80"
										fill="currentColor"
										opacity="0.7"
								/>
								<line x1="200" y1="70" x2="200" y2="115" stroke="currentColor" strokeWidth="0.5"/>
							</g>
					))}
					
					{/* Inner geometric pattern ring */}
					<circle cx="200" cy="200" r="90" fill="none" stroke="currentColor" strokeWidth="1"/>
					
					{/* Geometric squares/diamonds pattern */}
					{Array.from({length: 16}).map((_, i) => (
							<rect
									key={`diamond-${i}`}
									x="195"
									y="130"
									width="10"
									height="10"
									transform={`rotate(${(i * 22.5).toFixed(1)} 200 200) rotate(45 200 135)`}
									fill="none"
									stroke="currentColor"
									strokeWidth="0.75"
							/>
					))}
					
					{/* Central sun/star pattern */}
					<circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="1.5"/>
					<circle cx="200" cy="200" r="45" fill="none" stroke="currentColor" strokeWidth="1"/>
					
					{/* Sun rays */}
					{Array.from({length: 16}).map((_, i) => (
							<line
									key={`ray-${i}`}
									x1="200"
									y1="155"
									x2="200"
									y2="175"
									transform={`rotate(${(i * 22.5).toFixed(1)} 200 200)`}
									stroke="currentColor"
									strokeWidth="1.5"
							/>
					))}
					
					{/* Center */}
					<circle cx="200" cy="200" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
					<circle cx="200" cy="200" r="15" fill="currentColor" opacity="0.3"/>
					<circle cx="200" cy="200" r="8" fill="currentColor" opacity="0.5"/>
				</svg>
			</div>
	);
}

// Horizontal divider pattern
export function TrongDongDivider({className = ''}: { className?: string }) {
	return (
			<div className={`w-full flex items-center justify-center py-8 ${className}`}>
				<svg viewBox="0 0 800 60" className="w-full max-w-4xl h-12 text-primary/10">
					{/* Left decorative line */}
					<line x1="0" y1="30" x2="280" y2="30" stroke="currentColor" strokeWidth="1"/>
					
					{/* Central drum motif */}
					<g transform="translate(400, 30)">
						<circle r="25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
						<circle r="18" fill="none" stroke="currentColor" strokeWidth="1"/>
						<circle r="10" fill="none" stroke="currentColor" strokeWidth="0.75"/>
						<circle r="4" fill="currentColor" opacity="0.5"/>
						
						{/* Small sun rays */}
						{Array.from({length: 8}).map((_, i) => (
								<line
										key={i}
										x1="0"
										y1="-12"
										x2="0"
										y2="-18"
										transform={`rotate(${i * 45})`}
										stroke="currentColor"
										strokeWidth="1"
								/>
						))}
					</g>
					
					{/* Right decorative line */}
					<line x1="520" y1="30" x2="800" y2="30" stroke="currentColor" strokeWidth="1"/>
					
					{/* Small decorative elements */}
					<circle cx="300" cy="30" r="3" fill="currentColor" opacity="0.5"/>
					<circle cx="500" cy="30" r="3" fill="currentColor" opacity="0.5"/>
				</svg>
			</div>
	);
}

// Small badge/seal for product cards
export function TrongDongBadge({className = ''}: { className?: string }) {
	return (
			<div className={`relative ${className}`}>
				<svg viewBox="0 0 40 40" className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 drop-shadow-sm">
					{/* Outer decorative ring with pattern */}
					<circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
					<circle cx="20" cy="20" r="18" fill="white" fillOpacity="0.2" className="backdrop-blur-[1px]"/>
					<circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5"/>
					<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1"/>
					<circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.75"/>
					<circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
					<circle cx="20" cy="20" r="2" fill="currentColor"/>
					
					{/* Sun rays - more detailed */}
					{Array.from({length: 12}).map((_, i) => (
							<line
									key={i}
									x1="20"
									y1="4"
									x2="20"
									y2="8"
									transform={`rotate(${i * 30} 20 20)`}
									stroke="currentColor"
									strokeWidth="1"
							/>
					))}
					
					{/* Decorative dots in rings */}
					{Array.from({length: 8}).map((_, i) => (
							<circle
									key={`dot-${i}`}
									cx="20"
									cy="12"
									r="0.5"
									transform={`rotate(${i * 45} 20 20)`}
									fill="currentColor"
							/>
					))}
				</svg>
				{/* Subtle glow effect */}
				<div className="absolute inset-0 bg-primary/10 blur-md rounded-full -z-10 animate-pulse-slow"></div>
			</div>
	);
}

// Footer band pattern
export function TrongDongBand({className = ''}: { className?: string }) {
	return (
			<div className={`w-full overflow-hidden ${className}`}>
				<svg viewBox="0 0 1200 40" className="w-full h-8 text-primary-foreground/10" preserveAspectRatio="none">
					{/* Repeating pattern band */}
					<pattern id="drumPattern" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
						{/* Concentric circles */}
						<circle cx="50" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
						<circle cx="50" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.75"/>
						<circle cx="50" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
						<circle cx="50" cy="20" r="2" fill="currentColor"/>
						
						{/* Connecting lines */}
						<line x1="0" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="0.5"/>
						<line x1="65" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5"/>
						
						{/* Small decorative dots */}
						<circle cx="20" cy="20" r="1.5" fill="currentColor"/>
						<circle cx="80" cy="20" r="1.5" fill="currentColor"/>
					</pattern>
					
					<rect width="100%" height="100%" fill="url(#drumPattern)"/>
				</svg>
			</div>
	);
}

export default TrongDongWatermark;
