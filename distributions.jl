### A Pluto.jl notebook ###
# v0.14.8

using Markdown
using InteractiveUtils

# This Pluto notebook uses @bind for interactivity. When running this notebook outside of Pluto, the following 'mock version' of @bind gives bound variables a default value (instead of an error).
macro bind(def, element)
    quote
        local el = $(esc(element))
        global $(esc(def)) = Core.applicable(Base.get, el) ? Base.get(el) : missing
        el
    end
end

# ╔═╡ 6da08cc6-bf31-4649-bad2-86bb71ae58d4
using PlutoUI

# ╔═╡ 3caea06d-0555-4b21-a4bf-6125b10fc805
using CairoMakie, Makie

# ╔═╡ 7c01ee7c-dc75-11eb-2d4b-05a120eb3027
using ModelingToolkit

# ╔═╡ 8b587ada-bc80-4d18-8963-662e1f5f2b55
using DifferentialEquations: solve

# ╔═╡ 40a46e32-8506-4f27-bb58-8cbe312f090c
using Random, StatsKit

# ╔═╡ fd4c37c9-8c4c-49b2-a569-fb147d685fa3
TableOfContents(title="")

# ╔═╡ 76a5e0d6-b4b7-4fcf-b9b9-a2fca5164a1a
md"## Differential Equations"

# ╔═╡ 0ae587f6-44d7-4d55-8398-fc2f094bf447
@variables t x(t) RHS(t)  # independent and dependent variables

# ╔═╡ f0292cfd-1c63-4e75-9608-8a9edc699e3b
@parameters τ       # parameters

# ╔═╡ 12f13433-ed6d-478a-ae30-f571b4fd1913
D = Differential(t) # define an operator for the differentiation w.r.t. time

# ╔═╡ 6fd58ad2-3e78-4d55-b9ad-2f30b37dddc1
# your first ODE, consisting of a single equation, indicated by ~
@named fol_separate = ODESystem([ RHS  ~ (1 - x)/τ,
                                  D(x) ~ RHS ])

# ╔═╡ b729afad-f342-4987-8281-c906ce7fe85f
prob = ODEProblem(structural_simplify(fol_separate), [x => 0.0], (0.0,10.0), [τ => 3.0])

# ╔═╡ 1634bd50-d189-4f03-b2f9-13de729569c4
sol = solve(prob)

# ╔═╡ d18bc94e-b475-47ff-9745-8fad5f8874c1
struct Solution
    data 
end

# ╔═╡ 2eb9f53a-cea6-413d-8914-a2524e4272d1
Makie.used_attributes(::Any, x::Solution) = (:attribute,)

# ╔═╡ c0daaae1-a2ef-44d0-8e58-7a8ea44fca2c
function Makie.convert_arguments(p::Makie.PointBased, x::Solution; attribute = 1.0)
    return convert_arguments(p, x.data  .* attribute,)
end

# ╔═╡ fc4ddd95-321c-4bdd-87bd-128fc1795883
scatter(Solution(sol.t), attribute=5)

# ╔═╡ 74d0e4ca-a22d-43f1-b57f-582413879232
md"## Distributions"

# ╔═╡ 2ccc3bd9-9ddb-4f50-86f1-e5b2cb6cf157
Random.seed!(123) 

# ╔═╡ 6953598b-ccb3-4752-bddd-ed1c5727985d
md"### Binomial Distribution"

# ╔═╡ b4cc5847-2a3c-492c-9fff-7f0364e0d8fc
md"""
$(@bind p1 PlutoUI.Slider(1:10:1000))

n
"""

# ╔═╡ ce5b1140-41a4-43f2-be1f-f81c8d4fd091
p1

# ╔═╡ 5d4929d0-4d4a-4f92-adee-8fbdd6f6712d
md"""
$(@bind p2 PlutoUI.Slider(0.01:0.05:1))

p
"""

# ╔═╡ 26db9bdd-9c5e-4d31-bb84-bf81a4d0ee4f
p2

# ╔═╡ 1000798a-8d59-4ac0-8ae8-f256e4018257
hist(rand(Binomial(p1, p2), p1), normalization = :pdf)

# ╔═╡ b34f9fad-9098-412d-a15a-3e30fb735ad7
md"### Poission Distribution"

# ╔═╡ 2b82e756-fd42-4ec7-9cfb-2475b9113058


# ╔═╡ ac9136b8-6cbe-4047-8ac5-b5111aebba03
md"### Normal Distribution"

# ╔═╡ 30b034ec-55c0-45e9-9271-c195128164e8
md"""
$(@bind μ PlutoUI.Slider(-1:0.2:1)) μ

$(@bind σ PlutoUI.Slider(0:0.1:1)) σ

$(@bind n PlutoUI.Slider(10:100:1000)) n
"""

# ╔═╡ 23514c6a-41a9-4093-a647-5249a034f09c
d = Normal(μ, σ)

# ╔═╡ 0a49c37e-f396-4a9c-b1be-2ca1dd180345
p = rand(d, n)

# ╔═╡ 8e502e8b-850b-436d-9922-3ae75729b077
hist(p, normalization = :pdf)

# ╔═╡ 3ba74cfa-9d76-4bbb-80e8-43e40136e326


# ╔═╡ 7c2fbb51-7c48-4076-8b28-29937338ae80
md"""
$(@bind u PlutoUI.Slider(-1:0.2:1)) μ

$(@bind v PlutoUI.Slider(0:0.1:1)) σ

$(@bind nn PlutoUI.Slider(10:100:1000)) n
"""

# ╔═╡ Cell order:
# ╠═6da08cc6-bf31-4649-bad2-86bb71ae58d4
# ╠═3caea06d-0555-4b21-a4bf-6125b10fc805
# ╠═fd4c37c9-8c4c-49b2-a569-fb147d685fa3
# ╟─76a5e0d6-b4b7-4fcf-b9b9-a2fca5164a1a
# ╠═7c01ee7c-dc75-11eb-2d4b-05a120eb3027
# ╠═8b587ada-bc80-4d18-8963-662e1f5f2b55
# ╠═0ae587f6-44d7-4d55-8398-fc2f094bf447
# ╠═f0292cfd-1c63-4e75-9608-8a9edc699e3b
# ╠═12f13433-ed6d-478a-ae30-f571b4fd1913
# ╠═6fd58ad2-3e78-4d55-b9ad-2f30b37dddc1
# ╠═b729afad-f342-4987-8281-c906ce7fe85f
# ╠═1634bd50-d189-4f03-b2f9-13de729569c4
# ╠═d18bc94e-b475-47ff-9745-8fad5f8874c1
# ╠═2eb9f53a-cea6-413d-8914-a2524e4272d1
# ╠═c0daaae1-a2ef-44d0-8e58-7a8ea44fca2c
# ╠═fc4ddd95-321c-4bdd-87bd-128fc1795883
# ╟─74d0e4ca-a22d-43f1-b57f-582413879232
# ╠═40a46e32-8506-4f27-bb58-8cbe312f090c
# ╠═2ccc3bd9-9ddb-4f50-86f1-e5b2cb6cf157
# ╟─6953598b-ccb3-4752-bddd-ed1c5727985d
# ╟─b4cc5847-2a3c-492c-9fff-7f0364e0d8fc
# ╠═ce5b1140-41a4-43f2-be1f-f81c8d4fd091
# ╟─5d4929d0-4d4a-4f92-adee-8fbdd6f6712d
# ╠═26db9bdd-9c5e-4d31-bb84-bf81a4d0ee4f
# ╠═1000798a-8d59-4ac0-8ae8-f256e4018257
# ╟─b34f9fad-9098-412d-a15a-3e30fb735ad7
# ╠═2b82e756-fd42-4ec7-9cfb-2475b9113058
# ╟─ac9136b8-6cbe-4047-8ac5-b5111aebba03
# ╠═30b034ec-55c0-45e9-9271-c195128164e8
# ╠═23514c6a-41a9-4093-a647-5249a034f09c
# ╠═0a49c37e-f396-4a9c-b1be-2ca1dd180345
# ╠═8e502e8b-850b-436d-9922-3ae75729b077
# ╠═3ba74cfa-9d76-4bbb-80e8-43e40136e326
# ╠═7c2fbb51-7c48-4076-8b28-29937338ae80
