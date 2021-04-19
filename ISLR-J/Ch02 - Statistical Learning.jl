### A Pluto.jl notebook ###
# v0.14.2

using Markdown
using InteractiveUtils

# ╔═╡ 2e4eb43a-9325-414a-ac27-afe8f3757aa6
begin
	using LinearAlgebra
	using StatsKit
	using AlgebraOfGraphics, CairoMakie
	using Gadfly
end

# ╔═╡ 65c0ef6f-d0bd-4778-8dfe-4166b5b50608
md"""# 2. Statistical Learning"""

# ╔═╡ 8bc7346d-bc5f-4df6-a10f-95a2ad7c5f6c
md"""## 2.1 What Is Statistical Learning ?"""

# ╔═╡ 5c82da9b-9a3d-47d1-91a8-621134a39038
md"""### FIGURE 2.1."""

# ╔═╡ fe33477a-87f3-4465-bff9-531e3bd55c4d
adv_df = CSV.File("../data-islr/Advertising.csv") |> DataFrame;

# ╔═╡ 6df71a28-1c2c-4797-b697-203c1b176bbc
first(adv_df, 5)

# ╔═╡ 4228af87-a2a3-45fd-8ae0-2c3316fcdb06
begin
	set_default_plot_size(18cm, 9cm)
	p1 = Gadfly.plot(
		adv_df, x="TV", y="sales", 
		layer(Geom.point, color=[colorant"blue"]), 
		layer(
			Stat.smooth(method=:lm, levels=[0.95]), 
			Geom.line, Geom.ribbon, color=[colorant"red"]),
		Guide.xlabel("TV"), Guide.ylabel("Sales")
	)
	p2 = Gadfly.plot(
		adv_df, x="radio", y="sales", 
		layer(Geom.point, color=[colorant"blue"]), 
		layer(
			Stat.smooth(method=:lm, levels=[0.95]), 
			Geom.line, Geom.ribbon, color=[colorant"red"]),
		Guide.xlabel("Radio"), Guide.ylabel("Sales")
	)
	p3 = Gadfly.plot(
		adv_df, x="newspaper", y="sales",
		layer(Geom.point, color=[colorant"blue"]), 
		layer(
			Stat.smooth(method=:lm, levels=[0.95]), 
			Geom.line, Geom.ribbon, color=[colorant"red"]),
		Guide.xlabel("Newspaper"), Guide.ylabel("Sales")
	)
	
	hstack(p1, p2, p3)
end

# ╔═╡ b7cb5976-2b1b-4579-9a4f-5e5d2a2bae50
md"""### FIGURE 2.2."""

# ╔═╡ fb0f8735-395c-4bf2-834c-85579632dbc9
income_df = CSV.File("../data-islr/Income1.csv") |> DataFrame;

# ╔═╡ 91d0a047-9359-4453-a6bf-7845749b4975
first(income_df, 5)

# ╔═╡ 5c93ee1c-33e8-4f32-9895-46e7503b7f62
begin
	set_default_plot_size(18cm, 9cm)
	xmin = minimum(income_df.Education)-1
	xmax = maximum(income_df.Education)+1
	g1 = Gadfly.plot(
			income_df, x="Education", y="Income", 
			layer(Geom.point, color=[colorant"blue"]),
			Guide.xlabel("Years of Education"), Guide.ylabel("Income"),
			Guide.xticks(ticks=xmin:2:xmax)
		)
	g2 = Gadfly.plot(
			income_df, x="Education", y="Income", 
			layer(Geom.point, color=[colorant"blue"]), 
			layer(
				Stat.smooth(method=:loess, levels=[0.95]), 
				Geom.line, color=[colorant"red"]),
			Guide.xlabel("Years of Education"), Guide.ylabel("Income"),
			Guide.xticks(ticks=xmin:2:xmax)
		)
	hstack(g1, g2)
end

# ╔═╡ b01c5b23-8d22-42d0-8917-7a9f0ba80760


# ╔═╡ Cell order:
# ╠═65c0ef6f-d0bd-4778-8dfe-4166b5b50608
# ╠═2e4eb43a-9325-414a-ac27-afe8f3757aa6
# ╠═8bc7346d-bc5f-4df6-a10f-95a2ad7c5f6c
# ╠═5c82da9b-9a3d-47d1-91a8-621134a39038
# ╠═fe33477a-87f3-4465-bff9-531e3bd55c4d
# ╠═6df71a28-1c2c-4797-b697-203c1b176bbc
# ╠═4228af87-a2a3-45fd-8ae0-2c3316fcdb06
# ╠═b7cb5976-2b1b-4579-9a4f-5e5d2a2bae50
# ╠═fb0f8735-395c-4bf2-834c-85579632dbc9
# ╠═91d0a047-9359-4453-a6bf-7845749b4975
# ╠═5c93ee1c-33e8-4f32-9895-46e7503b7f62
# ╠═b01c5b23-8d22-42d0-8917-7a9f0ba80760
