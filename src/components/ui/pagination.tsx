import * as React from "react";
import {ChevronLeft, ChevronRight, MoreHorizontal} from "lucide-react";

import {cn} from "@/lib/utils";
import {ButtonProps} from "@/components/ui/button";

const Pagination = ({className, ...props}: React.ComponentProps<"nav">) => (
		<nav
				role="navigation"
				aria-label="pagination"
				className={cn("mx-auto flex w-full justify-center", className)}
				{...props}
		/>
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
		({className, ...props}, ref) => (
				<ul ref={ref} className={cn("flex flex-row items-center gap-2", className)} {...props} />
		),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
		({className, ...props}, ref) => (
				<li ref={ref} className={cn("", className)} {...props} />
		)
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, "size"> &
		React.ComponentProps<"button">;

const PaginationLink = ({className, isActive, size = "icon", ...props}: PaginationLinkProps) => (
		<button
				type="button"
				aria-current={isActive ? "page" : undefined}
				className={cn(
						"inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
						"h-10 w-10 border-2",
						isActive
								? "bg-primary text-primary-foreground border-primary shadow-lg scale-110"
								: "bg-background text-foreground border-border hover:border-primary hover:text-primary hover:scale-105",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
						"disabled:pointer-events-none disabled:opacity-50",
						className
				)}
				{...props}
		/>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({className, disabled, ...props}: React.ComponentProps<typeof PaginationLink> & {
	disabled?: boolean
}) => (
		<PaginationLink
				aria-label="Trang trước"
				size="default"
				className={cn(
						"w-auto px-4 gap-1 rounded-full",
						disabled && "opacity-50 cursor-not-allowed",
						className
				)}
				disabled={disabled}
				{...props}
		>
			<ChevronLeft className="h-4 w-4"/>
			<span className="hidden sm:inline">Trước</span>
		</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({className, disabled, ...props}: React.ComponentProps<typeof PaginationLink> & {
	disabled?: boolean
}) => (
		<PaginationLink
				aria-label="Trang sau"
				size="default"
				className={cn(
						"w-auto px-4 gap-1 rounded-full",
						disabled && "opacity-50 cursor-not-allowed",
						className
				)}
				disabled={disabled}
				{...props}
		>
			<span className="hidden sm:inline">Sau</span>
			<ChevronRight className="h-4 w-4"/>
		</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({className, ...props}: React.ComponentProps<"span">) => (
		<span
				aria-hidden
				className={cn("flex h-10 w-10 items-center justify-center text-muted-foreground", className)}
				{...props}
		>
    <MoreHorizontal className="h-4 w-4"/>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
