using Markdown
using InteractiveUtils

# ╔═╡ ddd9f9f0-9814-11eb-1a01-b7b80b2fb959
begin
    using LinearAlgebra
    using AlgebraOfGraphics, CairoMakie
    using CSV
end

# ╠═be4a5053-39ea-4d1b-8286-b32c0748c472
md"
# 2. Statistical Learning
"

md"
## 2.1 What Is Statistical Learning ?
"

md"
### FIGURE 2.1.
"

adv_df = CSV.File("../data-islr/Advertising.csv") |> DataFrame;
first(adv_df, 5)



income_df = CSV.File("../data-islr/Income1.csv") |> DataFrame;
first(income_df, 5)

# ╔═╡ Cell order:
# ╠═ddd9f9f0-9814-11eb-1a01-b7b80b2fb959
# ╠═be4a5053-39ea-4d1b-8286-b32c0748c472
